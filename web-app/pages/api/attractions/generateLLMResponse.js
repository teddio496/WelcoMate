const {GoogleGenerativeAI} = require("@google/generative-ai");
export default async function handler(req,res){
    if (req.method === 'POST'){
        const {attractions_data ,weather_data, purpose_of_trip, who_is_travelling, interests, preferences,other_info} = req.body
        console.log(attractions_data)
        const genAI = new GoogleGenerativeAI(process.env.LLM_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Give a JSON response, say nothing else. Use ONLY INFORMATION FROM the json "+JSON.stringify(attractions_data)+" dataset, which contains information on attractions. \
        For each date in the JSON"+JSON.stringify(weather_data)+", select three attractions from attractions_data (without replacement) and assign them to the morning, afternoon, and night keys. \
        If the weather condition for that date is not ideal, only select attractions that are indoor, otherwise, try to balance indoor and outdoor activities. For each attraction, \
        include only the following keys: title, address, description, link_url, and indoor_outdoor. Tailor each description based on the context of the following prompts: \
        "+purpose_of_trip+", "+who_is_travelling+", "+interests+", "+preferences+", "+other_info+". The format of the JSON must follow this structure: { 'day_1': { 'morning': { 'title': '...', 'address': '...', \
        'description': '...', 'link_url': '...'}, 'afternoon': { 'title': '...', 'address': '...', 'description': '...', 'link_url': '...'}, \
        'night': { 'title': '...', 'address': '...', 'description': '...', 'link_url': '...'} }, 'day_N': { repeat the structure for other days } }";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }else{
        return res.send(404).send({"error":"Not POST Request"})
    }
}