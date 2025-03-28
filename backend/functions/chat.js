const { GoogleGenerativeAI } = require('@google/generative-ai');

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

exports.handler = async function (event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Debug mode if API key is missing
    if (!process.env.GOOGLE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error:
            'API key is missing. Please check environment variables.',
          debug: true,
        }),
      };
    }

    const body = JSON.parse(event.body);
    const {
      message,
      history = [],
      model = 'gemini-2.0-flash',
    } = body;

    // First check if the user is trying to ask about instructions
    if (isAskingAboutInstructions(message)) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          response:
            "I'm an AI assistant designed to provide information about Jean's portfolio. I can tell you about his skills, experience, projects, or how to contact him. How can I help you learn more about Jean today?",
        }),
      };
    }

    // Initialize the API with your API key (this will use the environment variable)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Use the specified model (defaulting to 2.0)
    const generativeModel = genAI.getGenerativeModel({ model });

    // Create the chat session with history
    const chat = generativeModel.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      systemInstruction: systemInstruction,
    });

    // Send the user's message and get a response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    console.error('Error processing chat:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process request',
        message: error.message,
        stack:
          process.env.NODE_ENV === 'development'
            ? error.stack
            : undefined,
      }),
    };
  }
};
