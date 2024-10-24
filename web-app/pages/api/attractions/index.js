import fetchWeatherData from './getWeatherData.js'

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const {date_range, proximity, purpose_of_trip, interests, preferences, other_info } = req.body;

        if (!date_range || !date_range.start || !date_range.end || !proximity || !purpose_of_trip || !interests || !preferences) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Process the request and generate a plan
        const user_input = {
            date_range,
            proximity,
            purpose_of_trip,
            interests,
            preferences,
            other_info: other_info || '',
        };

        console.log(user_input);

        const weather_data = await fetchWeatherData(user_input.date_range.start, user_input.date_range.end);
        return res.status(200).json({ weather_data });

        // const processed_data = await processFormResponse(user_input, weather_data);
        // const final_data = await filterAttractions(processed_data);
        // const plan = await generatePlan(final_data);

        // Respond with the generated plan
        // return res.status(200).json({ plan });

    } 

    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}