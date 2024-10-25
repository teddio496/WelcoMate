const {GoogleGenerativeAI} = require("@google/generative-ai");

export default async function generateResponse(attractions_data, weather_data, user_input) {

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Give a JSON response; say nothing else. Use only information from the json "+JSON.stringify(attractions_data)+" dataset, which contains information on attractions. \
        For each date in the json "+JSON.stringify(weather_data)+", select three attractions from attractions_data (without replacement) and assign them to the morning, afternoon, and night keys. \
        If the weather condition for that date is not ideal, only select attractions that are indoor. If it is sunny, select outdoor attractions. Otherwise, balance them. For each attraction, \
        include only the following keys: title, address, description, link_url, and indoor_outdoor. Tailor each description based on the context of the following prompts: \
        "+user_input.purpose_of_trip+", "+user_input.interests+", "+user_input.preferences+", "+user_input.other_info+". \
        The format of the JSON must follow this structure: { 'day_1': { 'weather': {'low_temp': '...', 'high_temp': '...', 'weather_condition': '...'}, \
        'morning': { 'title': '...', 'address': '...', 'description': '...', 'link_url': '...'}, \
        'afternoon': { 'title': '...', 'address': '...', 'description': '...', 'link_url': '...', 'low_temp': '...'}, \
        'night': { 'title': '...', 'address': '...', 'description': '...', 'link_url': '...'} }, \
        'day_N': { repeat the same structure for all other days } }";

        const result = await model.generateContent(prompt);

        return result.response.text();
    }
    catch (error) {
        throw new Error('Failed to generate response');
    }

}