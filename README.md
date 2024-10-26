# WelcoMate Trip Planner

## Project Description

**WelcoMate Trip Planner** is a SaaS product designed to enhance guest experiences for middle to large-scale hotels, resorts, and, in the future, corporations and educational institutions (B2B). WelcoMate offers dynamic, personalized trip planning based on real-time weather conditions and user preferences, providing guests with a tailored experience to make the most of their stay.

### Key Features:
1. **Weather-based Recommendations**: WelcoMate fetches weather data using a weather API to specify appropriate attractions for users to visit on each particular day.
2. **Attractions and Restaurants**: The system recommends local attractions and restaurants by leveraging HuggingFace’s sentence transformer (`all-MiniLM-L6-v2`) to calculate semantic similarities between user inputs and available descriptions.
3. **Dynamic Trip Planning**: After fetching and analyzing relevant data, WelcoMate sends it to the Gemini API, which generates a personalized trip plan tailored to the user's preferences.

---

## Installation & Setup

**How to install and run the project**:  
First, navigate to /web-app.  
Now, obtain a Gemini and Google Maps API key:  
HuggingFace Inference API:  
Step 1: https://huggingface.co/join  
Step 2: https://huggingface.co/settings/tokens (click "Create new token")  

Gemini API:  
Step 1: https://ai.google.dev/  
Step 2: https://aistudio.google.com/app/apikey (click "Create API key")  

Next, create a .env file in the same directory as /web-app with the following contents:  
```
HUGGINGFACE_KEY=YOUR_API_KEY  
GEMINI_KEY=YOUR_API_KEY  
ACCESS_TOKEN_SECRET="Any string here would do"  
REFRESH_TOKEN_SECRET="Any string here would do"
```

Then install dependencies using `npm i`, then run the development server using `npm run dev`.  


---

## Usage Instructions

**How to use the project**:  
_TBD_

---

## Credits

This project was created and developed by the following team members:
- Albert Ho: Team-Lead/Vision
- Patrick Hu: Full-stack Developer
- Teddy Ho: Full-stack Developer
- Oscar Pang: ML Engineer/Back-end
- Eddison Pham: ML Engineer/Back-end
