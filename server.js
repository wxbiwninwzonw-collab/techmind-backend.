const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// الترتيب الصحيح للأوامر
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/ask', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(req.body.prompt);
    const response = await result.response;
    res.json({ answer: response.text() });
  } catch (error) {
    res.status(500).json({ answer: "السيرفر واجه مشكلة في الرد." });
  }
});

app.get('/', (req, res) => res.send('السيرفر شغال وزي الفل!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
              
