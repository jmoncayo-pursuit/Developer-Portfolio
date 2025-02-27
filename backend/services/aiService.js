import { GoogleGenerativeAI } from '@google/generative-ai';
import { personalInfo } from '../config/personalData.js';

class AIService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: process.env.AI_MODEL || 'gemini-1.5-pro',
      generationConfig: {
        temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
        topP: parseFloat(process.env.AI_TOP_P) || 0.9,
        topK: parseInt(process.env.AI_TOP_K) || 40,
        maxOutputTokens: parseInt(process.env.AI_MAX_TOKENS) || 2048,
      },
    });
    this.context = this.buildContext();
  }

  buildContext() {
    return `
    You are an AI assistant helping people learn about Jean's portfolio.

    Important: Always use male pronouns (he/him/his) when referring to Jean.
    Example: "You can check out his projects" (not "her projects")

    When mentioning contact information, follow these examples exactly:
    To suggest LinkedIn: "You can find him on LinkedIn at https://linkedin.com/in/jeanmoncayo247"
    To suggest GitHub: "Check out his code on GitHub at https://github.com/jmoncayo-pursuit"
    To suggest email: "You can email him at Jean.Moncayo@gmail.com"

    Always use the full https:// URLs for LinkedIn and GitHub.
    Always maintain professional and respectful language.
    `;
  }

  async generateResponse(userQuery, conversationHistory = []) {
    try {
      const prompt = `
      ${this.context}
      
      Previous conversation:
      ${conversationHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n')}
      
      User Query: "${userQuery}"
      `;

      const result = await this.model.generateContent(prompt);
      return {
        response: this.formatResponse(result.response.text()),
        error: null,
      };
    } catch (error) {
      console.error('AI Generation Error:', error);
      return {
        response: null,
        error:
          'I apologize, but I encountered an error. Please try again.',
      };
    }
  }

  formatResponse(text) {
    // Simple URL detection and conversion to clickable links
    return text
      .replace(
        /(https:\/\/[^\s]+)/g,
        (url) =>
          `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
      )
      .replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        (email) => `<a href="mailto:${email}">${email}</a>`
      );
  }

  wrapText(text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = [];
    let currentLength = 0;

    words.forEach((word) => {
      if (currentLength + word.length + 1 <= maxWidth) {
        currentLine.push(word);
        currentLength += word.length + 1;
      } else {
        lines.push(currentLine.join(' '));
        currentLine = [word];
        currentLength = word.length + 1;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }

    return lines.join('\n');
  }
}

export default AIService;
