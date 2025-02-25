import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AIService from './services/aiService.js';

dotenv.config();

const app = express();
const aiService = new AIService(process.env.GOOGLE_API_KEY);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    const { response, error } = await aiService.generateResponse(
      message,
      history
    );

    if (error) {
      return res.status(500).json({ error });
    }

    res.json({ response });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred. Please try again.',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
