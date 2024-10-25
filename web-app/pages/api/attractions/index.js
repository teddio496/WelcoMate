import fetchWeatherData from './getWeatherData.js'
import recommendAttractions from './filterAttractions.js'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const {date_range, purpose_of_trip, interests, preferences, other_info } = req.body;

        if (!date_range || !date_range.start || !date_range.end || !purpose_of_trip || !interests || !preferences) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Process the request and generate a plan
        const user_input = {
            date_range,
            purpose_of_trip,
            interests,
            preferences,
            other_info: other_info || '',
        };

        console.log(user_input);

        const weather_data = await fetchWeatherData(user_input.date_range.start, user_input.date_range.end);
        const attractions_data = await recommendAttractions(user_input);

        return res.status(200).json({ weather_data, attractions_data });

        // const plan = await generateLLMResponse(attractions_data, weather_data);

        // Respond with the generated plan
        // return res.status(200).json({ plan });

    } 

    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}