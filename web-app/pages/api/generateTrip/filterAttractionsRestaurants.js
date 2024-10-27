import axios from 'axios';
import attractionsTags from '../../../data/attractions/tags.json';
import restaurantsTags from '../../../data/restaurants/tags.json';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// HuggingFace Inference
const apiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
const apiKey = process.env.HUGGINGFACE_KEY;

// Function to fetch embeddings from Hugging Face Inference API
const getSimilarities = async (text, tags) => {
    try {
        const response = await axios.post(
            apiUrl,
            { 
                source_sentence: text,
                sentences: tags
            }, 
            {
                headers: { Authorization: `Bearer ${apiKey}` },
            }
        );
        return response.data;
    } 
    catch (error) {
        throw new Error('Failed to generate embedding');
    }
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

    return attractions;

}

// Fetch restaurants based on tags
async function getRestaurants(tags) {

    const restaurants = await prisma.restaurant.findMany({
        where: {
            tags: {
                some:{
                    name: {in: tags}
                }
            },
        },
    });

    return restaurants;

}

// Get top 5 tags for attractions or restaurants
async function getTopTags(text, tags) {
    const similarities = await getSimilarities(text, tags);

    const tagSimilarities = tags.map((tag, index) => ({
        tag,
        similarity: similarities[index],
    }));

    tagSimilarities.sort((a, b) => b.similarity - a.similarity);

    console.log(tagSimilarities);

    const topTags = tagSimilarities.slice(0, 5).map(item => item.tag);

    return topTags;
}

// Recommend attractions or restaurants based on user input
const recommend = async (userInput, attractions_or_restaurants) => {
    const { who_is_travelling, purpose_of_trip, interests, preferences, food_preferences} = userInput;

    let topTags = [];
    let topResults = [];
    
    try {

        if (attractions_or_restaurants === 'attractions') {
            const text = `${who_is_travelling} ${purpose_of_trip} ${interests} ${preferences}`;
            topTags = await getTopTags(text, attractionsTags);
            topResults = await getAttractions(topTags);
            console.log(topResults.length);
        }
        else if (attractions_or_restaurants === 'restaurants') {
            const text = `${food_preferences}`;
            topTags = await getTopTags(text, restaurantsTags);
            topResults = await getRestaurants(topTags);
            console.log(topResults.length);
        }
    
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to recommend attractions or restaurants');
    }

    return topResults;
};

export default recommend;