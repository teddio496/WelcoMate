const {GoogleGenerativeAI} = require("@google/generative-ai");

export default async function generateResponse(attractions_data, restaurants_data, weather_data, user_info, city) {

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // prompt for AI model
        const promptInstructions = `Use only information from the json dataset ${JSON.stringify(attractions_data)}, which contains information on attractions, 
        and the json dataset ${JSON.stringify(restaurants_data)}, which contains information on restaurants. 
        For each day in the json dataset ${JSON.stringify(weather_data)}, select 3 attractions from attractions_data (without replacement) and assign them to the morning, afternoon, and night keys. 
        Then, select 3 restaurants from restaurants_data and assign them to breakfast, lunch, and dinner keys. 
        If the weather condition for that date is not ideal, only select attractions that are indoors. If it is sunny, select outdoor attractions. Otherwise, balance them. 
        For each attraction, include only the following keys: title, address, description, imageLink, link_url.
        For each restaurant, include only the following keys: title, address, description, imageLink.
        Tailor each description for the user based on the context of the following prompts: trip type: ${user_info.who_is_travelling}; trip purpose: ${user_info.purpose_of_trip}; 
        user interests: ${user_info.interests}; user preferences: ${user_info.preferences}; other user info: ${user_info.other_info}.`;
        
        const jsonTemplate = 
        `{
            'day_1': {
                'weather': {
                    'high': '...',
                    'low': '...',
                    'condition': '...'
                },
                'breakfast': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...'
                },
                'morning': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...',
                    'link_url': '...'
                },
                'lunch': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...'
                },
                'afternoon': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...',
                    'link_url': '...'
                },
                'dinner': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...'
                },
                'night': {
                    'title': '...',
                    'address': '...',
                    'description': '...',
                    'imageLink': '...',
                    'link_url': '...'
                }
            },
            'day_N': { 
                // Repeat the structure for other days 
            }
        }`;

        const prompt = `Give a JSON response of a ${city} trip plan and say NOTHING else. Here are the instructions: ${promptInstructions}. Here is the template you must follow for your response: ${jsonTemplate}`;
        
        const result = await model.generateContent(prompt);

        return result.response.text();
    }
    catch (error) {
        throw new Error('Failed to generate response');
    }

}