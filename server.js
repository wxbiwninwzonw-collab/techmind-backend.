const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY; // هنجيبه من إعدادات Render
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    tools: [{ googleSearchRetrieval: {} }] 
});

app.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        res.json({ answer: result.response.text() });
    } catch (error) {
        res.status(500).json({ answer: "السيرفر مشغول" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is Live!'));
