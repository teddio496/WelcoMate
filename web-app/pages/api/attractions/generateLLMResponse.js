const {GoogleGenerativeAI} = require("@google/generative-ai");

export default async function handler(req,res){
    if (req.method === 'POST'){
        const {attractions_list ,date_range, purpose_of_trip, interests, preferences,other_info} = req.body
        const genAI = new GoogleGenerativeAI("AIzaSyAuKIjmmBOmCeRhKsw-JqAFmgjgv0ZNJpo")
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Explain how AI works";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }else{
        return res.send(404).send({"error":"Not POST Request"})
    }
}