# 🏨 WelcoMate 🏨
 
### 🏆 B2B Category Winner of the 2024 DaVinci Competition hosted by UofT W3B

---

## 🎯 Project Description

**WelcoMate** is a comprehensive SaaS platform designed for medium to large scale hotels and resorts, offering an all-in-one property management system with a standout AI-powered trip planner that provides personalized travel itineraries and seamless guest services through an intuitive, guest-centered application.

### Key Features:
1. **Guest dashboard and admin panel**
2. **Hotel service booking system**
3. **Dynamic AI trip planner**

---

## ⚙️ Prerequisites
Before getting started, ensure that you have the following:
- **Node.js** installed on your system.
- API keys for **HuggingFace** and **Gemini** for backend processing.

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

## 🛠 Installation & Setup 

### Step 1: Set up environment variables

- First, open your terminal and run the command `cd web-app`.
- Then, in the `/web-app` directory, create a `.env` file and add the following environment variables:

```env
HUGGINGFACE_KEY='YOUR_HUGGINGFACE_API_KEY'
GEMINI_KEY='YOUR_GEMINI_API_KEY'
ACCESS_TOKEN_SECRET='Any string here would do'
REFRESH_TOKEN_SECRET='Any string here would do'
```

### Step 2: Install dependencies and deploy

- Intall dependencies using `npm i`.
- Run the development server using `npm run dev`.️ 

### Step 3: Login as a hotel guest

- No hotel guest is currently logged in, so we have provided an admin account for your supposed hotel.  
- Visit `localhost:3000/adminLogin` and login with username `davinci` and password `thebesthackathon`.  
- Here you will see an example customer pre-registered for your hotel. Click on `Create Login` to send them an email with a link to create their account.  
- Since you cannot access this email account, a link to login to that customers' account will show up on the page. Copy and paste it into a new tab. 
- Now you are a hotel guest who has just logged into Welcomate! Enjoy the app and its features!  

---

## 💡 Credits

This project was created and developed by the following team members:
- Albert Ho: Team-Lead/Vision
- Patrick Hu: Full-stack Developer
- Jaehyeon Heo (Teddy): Full-stack Developer
- Oscar Pang: ML Engineer/Back-end
- Eddison Pham: ML Engineer/Back-end