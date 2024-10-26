import fetchWeatherData from './getWeatherData.js'
import recommend from './filterAttractionsRestaurants.js'
import generateLLMResponse from './generateLLMResponse.js'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { date_range, who_is_travelling, purpose_of_trip, interests, preferences, food_preferences, other_info } = req.body;

        if (!date_range || !date_range.start || !date_range.end || !who_is_travelling || !purpose_of_trip || !interests || !preferences || !food_preferences) {
            console.log(req.body);
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Process the request and generate a plan
        const user_input = {
            date_range,
            who_is_travelling,
            purpose_of_trip,
            interests,
            preferences,
            food_preferences,
            other_info: other_info || ' ',
        };

        console.log(user_input);

        const weather_data = await fetchWeatherData(user_input.date_range.start, user_input.date_range.end, 'Toronto');

        const [attractions_data, restaurants_data] = await Promise.all([
            recommend(user_input, 'attractions'),
            recommend(user_input, 'restaurants')
        ]);
        
        let response = "";
        let parsedResponse = {};
        
        let success = false;
        let retries = 0;

        // Retry up to 5 times if parsing fails
        while (!success && retries < 5) {
            try {
                response = await generateLLMResponse(attractions_data, restaurants_data, weather_data, user_input, 'Toronto');
                const firstBrace = response.indexOf('{');
                const lastBrace = response.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1) {
                    const jsonString = response.substring(firstBrace, lastBrace + 1);
                    parsedResponse = JSON.parse(jsonString);
                    success = true;
                }
            }
            catch (error) {
                console.log('Failed to parse response. Retrying...');
                retries++;
            }   
        }

        console.log(parsedResponse);

        try {
            await prisma.plan.create({
                data: {
                    plan: JSON.stringify(parsedResponse),
                    hotelGuestId: 1,
                },
            });
            console.log('Plan saved successfully');
        } 
        catch (error) {
            return res.status(500).json({ error: 'Failed to save plan' });
        }

        return res.status(200).json(response);
    } 

    else if (req.method === 'GET') {

        const { planId } = req.query;

        if (!planId) {
            return res.status(400).json({ error: 'Missing planId' });
        }

        try {
            const planObj = await prisma.plan.findUnique({
                where: { id: parseInt(planId) },
            });

            if (!planObj) {
                return res.status(404).json({ error: 'Plan not found' });
            }

            const plan = JSON.parse(planObj.plan);
        
            return res.status(200).json(plan);
        } 
        catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        } 

    }

    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}