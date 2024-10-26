# WelcoMate Trip Planner

## Project Description

**WelcoMate Trip Planner** is a SaaS product designed to enhance guest experiences for middle to large-scale hotels, resorts, and, in the future, corporations and educational institutions (B2B). WelcoMate offers dynamic, personalized trip planning based on real-time weather conditions and user preferences, providing guests with a tailored experience to make the most of their stay.

### Key Features:
1. **Weather-based Recommendations**: WelcoMate fetches weather data using a weather API to specify appropriate attractions for users to visit on each particular day.
2. **Attractions and Restaurants**: The system recommends local attractions and restaurants by leveraging HuggingFace’s sentence transformer (`all-MiniLM-L6-v2`) to calculate semantic similarities between user inputs and available descriptions.
3. **Dynamic Trip Planning**: After fetching and analyzing relevant data, WelcoMate sends it to the Gemini API, which generates a personalized trip plan tailored to the user's preferences.

---

## Prerequisites
Before getting started, ensure that you have the following:
- **Node.js** installed on your system.
- API keys for **HuggingFace** and **Gemini** for backend processing.

### To obtain the API keys

#### HuggingFace Inference API:
1. Navigate to [HuggingFace](https://huggingface.co/join) to create an account.
2. Visit your [token settings](https://huggingface.co/settings/tokens) and click **"Create new token"**.
3. Once the API key is generated, copy it.
4. Click on the 3 dots next to your token and navigate to **"Edit Permissions"**, then enable **"Make calls to the serverless Inference API"**.

#### Gemini API:
1. Navigate to [Google AI](https://ai.google.dev/) to create an account.
2. Go to [API key management](https://aistudio.google.com/app/apikey) and click **"Create API key"**.
3. Once the API key is generated, copy it.

---

## Installation & Setup

### Step 1: Set up environment bariables

First, open your terminal and run the command `cd web-app`

Then, in the `/web-app` directory, create a `.env` file and add the following environment variables:

```bash
HUGGINGFACE_KEY=YOUR_HUGGINGFACE_API_KEY
GEMINI_KEY=YOUR_GEMINI_API_KEY
ACCESS_TOKEN_SECRET="Any string here would do"
REFRESH_TOKEN_SECRET="Any string here would do"
```

### Step 2: Install dependencies and deploy

- Intall dependencies using `npm i`
- Run the development server using `npm run dev` and visit `localhost:3000` in the browser.

### Step 3: Login as a hotel guest

- No hotel guest is currently logged in, so we have provided an admin account for your supposed hotel.  
- Visit `localhost:3000/adminLogin` and login with username `davinci` and password `thebesthackathon`.  
- Here you will see an example customer pre-registered for your hotel. Click on `Create Login` to send them an email with a link to create their account.  
- Since you cannot access this email account, a link to login to that customers' account will show up on the page. Copy and paste it into a new tab. 
- Now you are a hotel guest who has just logged in to Welcomate! Enjoy the app and its features!  

---

## Credits

This project was created and developed by the following team members:
- Albert Ho: Team-Lead/Vision
- Patrick Hu: Full-stack Developer
- Jaehyeon Heo (Teddy): Full-stack Developer
- Oscar Pang: ML Engineer/Back-end
- Eddison Pham: ML Engineer/Back-end
