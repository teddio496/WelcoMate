const {GoogleGenerativeAI} = require("@google/generative-ai");

export default async function handler(req,res){
    if (req.method === 'POST'){
        const {attractions_list ,date_range, purpose_of_trip, interests, preferences,other_info} = req.body
        const genAI = new GoogleGenerativeAI(process.env.LLM_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Give a JSON response of the following and say nothing else: Given the days in the array "+date_range+", choose 3 attractions objects from "+attractions_list+" without replacement where the description is tailored based on: "+ purpose_of_trip+", "+interests+", "+preferences+", "+other_info+", and also satisfying the conditions: if the day's condition is rainy or thunderstorm, only pick attractions with the property that indoor_outdoor: Outdoor, otherwise pick any attractions. The JSON must follow the following format: {'day_1': {'morning': attraction_object1', 'afternoon': attraction_object2', 'night': attraction_object3}, ..., 'day_N': {...}}";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }else{
        return res.send(404).send({"error":"Not POST Request"})
    }
}