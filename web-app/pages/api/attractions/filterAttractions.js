import axios from 'axios';
import tags from '../../../data/attractions/tags.json';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Hugging Face Inference API URL and API key
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
const HUGGING_FACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Function to fetch embeddings from Hugging Face Inference API
const getSimilarities = async (text) => {
    try {
        const response = await axios.post(
            HUGGING_FACE_API_URL,
            { 
                source_sentence: text,
                sentences: tags
            }, 
            {
                headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` },
            }
        );
        return response.data;
    } 
    catch (error) {
        throw new Error('Failed to generate embedding');
    }
};

// Recommend attractions based on user input
const recommendAttractions = async (userInput) => {
    const { purpose_of_trip, interests, preferences } = userInput;
    const inputText = `${purpose_of_trip} ${interests} ${preferences}`;

    console.log(inputText);

    const similarities = await getSimilarities(inputText);

    console.log(similarities);

    const tagSimilarities = tags.map((tag, index) => ({
        tag,
        similarity: similarities[index],
    }));

    tagSimilarities.sort((a, b) => b.similarity - a.similarity);

    console.log(tagSimilarities);

    // Return the top 100 matching tags
    const topTags = tagSimilarities.slice(0, 10).map(item => item.tag);

    // Get the attractions corresponding to the top tags
    const topAttractions = await getAttractions(topTags);

    return topAttractions;
};

// Fetch attractions based on tags
async function getAttractions(tags) {

    const attractions = await prisma.attraction.findMany({
        where: {
            tags: {
                some:{
                    name: {in: tags}
                }
            },
        },
    });

    console.log(attractions.length);

    return attractions;

}

export default recommendAttractions;