import fetchWeatherData from './getWeatherData.js'
import recommend from './filterAttractionsRestaurants.js'
import generateLLMResponse from './generateLLMResponse.js'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { date_range, who_is_travelling, purpose_of_trip, interests, preferences, food_preferences, other_info } = req.body;

        if (!date_range || !date_range.start || !date_range.end || !who_is_travelling || !purpose_of_trip || !interests || !preferences || !food_preferences) {
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
        const attractions_data = await recommend(user_input, 'attractions');
        const restaurants_data = await recommend(user_input, 'restaurants');
        
        const response = await generateLLMResponse(attractions_data, restaurants_data, weather_data, user_input, 'Toronto');
        console.log(response);        

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