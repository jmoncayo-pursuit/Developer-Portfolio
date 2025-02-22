import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.5,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 5500,
  },
});

app.post('/api/generate-response', async (req, res) => {
  try {
    const { userQuery } = req.body;
    const prompt = `As an AI assistant representing this candidate, answer the following question: ${userQuery}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ response: response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
