import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { personalInfo } from './config/personalData.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.AI_MODEL || 'gemini-1.5-flash',
  generationConfig: {
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.5,
    topP: parseFloat(process.env.AI_TOP_P) || 0.95,
    topK: parseInt(process.env.AI_TOP_K) || 40,
    maxOutputTokens: parseInt(process.env.AI_MAX_TOKENS) || 5500,
  },
});

app.post('/api/generate-response', async (req, res) => {
  try {
    const { userQuery, currentPage, pageContent } = req.body;

    const contextPrompt = `
      You are an AI assistant for Jean Moncayo's portfolio website. 
      Important: Jean uses he/him pronouns.
      Current context: The user is on the "${currentPage}" page.
      ${
        pageContent
          ? `This page contains: ${JSON.stringify(pageContent)}`
          : ''
      }
      
      About Jean:
      - ${personalInfo.role} with background in ${
      personalInfo.background
    }
      - Technical skills include: React, Node.js, Express, PostgreSQL
      - Currently attending Pursuit Fellowship
      - Focused on process improvement and user experience

      When answering:
      1. Use he/him pronouns
      2. Label any quoted content with its source (Resume, About page, etc.)
      3. Be specific about which section is being discussed
      
      Question: ${userQuery}
    `;

    const result = await model.generateContent(contextPrompt);
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
