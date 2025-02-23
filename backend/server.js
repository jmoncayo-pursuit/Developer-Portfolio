import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { personalInfo } from './config/personalData.js';
import { resumeData } from './config/resumeData.js';

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
    const { userQuery, currentPage } = req.body;

    const contextPrompt = `
      You are an AI assistant for Jean Moncayo's portfolio website.
      Current page: "${currentPage || 'home'}"
      
      IMPORTANT - When mentioning pages, ALWAYS use these exact link formats (do not modify them):
      [Home](/) - Main overview
      [About](/about) - Background info
      [Projects](/projects) - Portfolio work
      [Contact](/contact) - Contact details

      For example, say exactly:
      "Check out the [Projects](/projects) page for his technical work."
      "Visit the [Contact](/contact) page to get in touch."
      
      Rules:
      1. Keep responses under 3 sentences
      2. Use he/him pronouns
      3. Always include at least one link in your response
      4. Only use the exact link formats shown above
      
      Question: "${userQuery}"
    `;

    const result = await model.generateContent(contextPrompt);
    const responseText = result.response.text();

    // Check if the response contains any of the valid links
    const validResponse = [
      '/)',
      '/about)',
      '/projects)',
      '/contact)',
    ].some((link) => responseText.includes(link));

    res.json({
      response: validResponse
        ? responseText
        : `Visit the [Home](/) page to learn more about Jean's portfolio.`,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      response:
        'I apologize, but I encountered an error. Please try again.',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
