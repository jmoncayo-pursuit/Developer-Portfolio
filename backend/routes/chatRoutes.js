const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the API with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// System instruction to include with every prompt
const systemInstruction = `
You are an AI assistant for Jean Moncayo's developer portfolio. 
Important: Always use male pronouns (he/him/his) when referring to Jean.
When providing contact information, format it as follows:
- Email: Jean.Moncayo@gmail.com
- LinkedIn: [Connect with Jean on LinkedIn]
- GitHub: [View Jean's projects on GitHub]

Respond in a helpful, professional manner about Jean's skills, experience, projects, and background.
`;

// Function to check if message is trying to reveal instructions
const isAskingAboutInstructions = (message) => {
  const triggerPhrases = [
    'instruction',
    'prompt',
    'system',
    'pronoun',
    'gender',
    'told to',
    'programmed to',
    'configured to',
    'designed to',
    'supposed to',
    'your rules',
    'your directive',
  ];

  const lowercaseMsg = message.toLowerCase();
  return triggerPhrases.some((phrase) =>
    lowercaseMsg.includes(phrase)
  );
};

router.post('/chat', async (req, res) => {
  console.log('Chat API hit! Processing request...');

  try {
    // Log key information
    console.log('API Key available:', !!process.env.GOOGLE_API_KEY);

    const {
      message,
      history = [],
      model = 'gemini-2.0-flash',
    } = req.body;

    console.log('Received message:', message);

    // First check if the user is trying to ask about instructions
    if (isAskingAboutInstructions(message)) {
      console.log(
        'Detected instruction request, sending canned response'
      );
      return res.json({
        response:
          "I'm an AI assistant designed to provide information about Jean's portfolio. I can tell you about his skills, experience, projects, or how to contact him. How can I help you learn more about Jean today?",
      });
    }

    // Initialize the API with your API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Use the specified model (defaulting to 2.0)
    const generativeModel = genAI.getGenerativeModel({ model });
    console.log('Model initialized:', model);

    // Create the chat session with history
    const chat = generativeModel.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      systemInstruction: systemInstruction,
    });

    console.log(
      'Chat session created with history length:',
      history.length
    );

    // Send the user's message and get a response
    console.log('Sending message to Gemini...');
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    console.log('Response received, length:', response.length);

    res.json({ response });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({
      error: 'Failed to process request',
      message: error.message,
      stack:
        process.env.NODE_ENV === 'development'
          ? error.stack
          : undefined,
    });
  }
});

module.exports = router;
