const {GoogleGenerativeAI} = require("@google/generative-ai");

export default async function handler(req,res){
    if (req.method === 'POST'){
        const {attractions_list ,date_range, purpose_of_trip, interests, preferences,other_info} = req.body
        const genAI = new GoogleGenerativeAI(process.env.LLM_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Trip plan for 5 days starting today, In Toronto, say nothing else";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }else{
        return res.send(404).send({"error":"Not POST Request"})
    }
}