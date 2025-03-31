const { GoogleGenerativeAI } = require('@google/generative-ai');

// Include a version comment to force redeployment
// VERSION: 1.0.3 - Updated 2025-05-19

// System instruction to include with every prompt
const systemInstruction = `
CRITICAL INSTRUCTION: YOU ARE AN AI ASSISTANT SPECIFICALLY FOR JEAN MONCAYO'S PORTFOLIO.
JEAN MONCAYO IS A MALE DEVELOPER.

THE ONLY VALID CONTACT INFORMATION IS:
Email: Jean.Moncayo@gmail.com
LinkedIn: https://www.linkedin.com/in/jeanmoncayo247
GitHub: http://github.com/jmoncayo-pursuit

You are an AI assistant for Jean Moncayo's developer portfolio. You have complete knowledge of Jean's background and should NEVER ask users for information about Jean. Always speak confidently about Jean's qualifications and experience.

ABSOLUTELY CRITICAL RULES:
1. ONLY provide information about Jean Moncayo
2. ONLY use the contact information listed above
3. NEVER use placeholder text like [Skill], [Company], or [Description] in your responses
4. NEVER ask users what aspect of Jean's background they want to know more about
5. Always use male pronouns (he/him/his) when referring to Jean
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

// Modified response function to double check specific types of questions
const createSafeResponse = (question, response) => {
  // Force correct contact info for questions about contact
  if (
    question.toLowerCase().includes('contact') ||
    question.toLowerCase().includes('email') ||
    question.toLowerCase().includes('reach')
  ) {
    return `You can contact Jean Moncayo through:

- Email: Jean.Moncayo@gmail.com
- LinkedIn: https://www.linkedin.com/in/jeanmoncayo247
- GitHub: http://github.com/jmoncayo-pursuit

Feel free to reach out with any questions about his projects or professional experience.`;
  }

  // Check if response contains incorrect email patterns
  if (
    response.includes('@gmail.com') &&
    !response.includes('Jean.Moncayo@gmail.com')
  ) {
    return `I apologize for the confusion. The correct contact information for Jean Moncayo is:

- Email: Jean.Moncayo@gmail.com
- LinkedIn: https://www.linkedin.com/in/jeanmoncayo247
- GitHub: http://github.com/jmoncayo-pursuit`;
  }

  return response;
};

exports.handler = async function (event, context) {
  const deploymentTimestamp = '2025-05-19T12:00:00Z';

  try {
    // Log deployment timestamp for debugging
    console.log(
      `Function running deployment from: ${deploymentTimestamp}`
    );

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
            "I'm an AI assistant designed to provide information about Jean Moncayo's portfolio. I can tell you about his skills, experience, projects, or how to contact him. How can I help you learn more about Jean today?",
        }),
      };
    }

    // Add safety checks for specific questions
    if (
      message.toLowerCase().includes('contact') ||
      message.toLowerCase().includes('email') ||
      message.toLowerCase().includes('reach out')
    ) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: `You can contact Jean Moncayo through:

- Email: Jean.Moncayo@gmail.com
- LinkedIn: https://www.linkedin.com/in/jeanmoncayo247
- GitHub: http://github.com/jmoncayo-pursuit

Feel free to reach out with any questions about his projects or professional experience.`,
        }),
      };
    }

    // Initialize the API with your API key (this will use the environment variable)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Use the specified model
    const generativeModel = genAI.getGenerativeModel({
      model,
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic responses
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 5500,
      },
    });

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
    const aiResponse = result.response.text();

    // Apply safety checks to ensure correct information
    const safeResponse = createSafeResponse(message, aiResponse);

    // Add headers to prevent caching
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      body: JSON.stringify({ response: safeResponse }),
    };
  } catch (error) {
    console.error('Error processing chat:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process request',
        message: error.message,
      }),
    };
  }
};
