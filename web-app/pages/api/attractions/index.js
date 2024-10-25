import fetchWeatherData from './getWeatherData.js'
import recommendAttractions from './filterAttractions.js'
import generateLLMResponse from './generateLLMResponse.js'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const { date_range, who_is_travelling, purpose_of_trip, interests, preferences, other_info } = req.body;

        if (!date_range || !date_range.start || !date_range.end || !who_is_travelling || !purpose_of_trip || !interests || !preferences) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Process the request and generate a plan
        const user_input = {
            date_range,
            who_is_travelling,
            purpose_of_trip,
            interests,
            preferences,
            other_info: other_info || '',
        };

        console.log(user_input);

        const weather_data = await fetchWeatherData(user_input.date_range.start, user_input.date_range.end, 'Toronto');
        const attractions_data = await recommendAttractions(user_input);
        
        const response = await generateLLMResponse(attractions_data, weather_data, user_input, 'Toronto');
        const plan = JSON.parse(response.substring(response.indexOf("{"), response.lastIndexOf("}") + 1));

        return res.status(200).json(plan);
    } 

    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}