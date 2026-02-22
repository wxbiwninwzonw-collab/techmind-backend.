const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// ربط محرك Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/ask', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt);
    const response = await result.response;
    res.json({ answer: response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "عذراً، واجهت مشكلة في التفكير حالياً!" });
  }
});

// ميزة الرسم (لو حبيت تضيفها لاحقاً)
app.post('/image', async (req, res) => {
  res.json({ answer: "ميزة الرسم سيتم تفعيلها فور ربط مفتاح DALL-E أو Stable Diffusion!" });
});

app.get('/', (req, res) => res.send('TechMind Server is Flying! 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  
