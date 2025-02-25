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
    You are an AI assistant for Jean Moncayo's portfolio website. Your purpose is to help visitors learn about Jean's skills, experience, and work.

    Core Information About Jean:
    ${JSON.stringify(personalInfo, null, 2)}

    Guidelines:
    1. Be direct and informative
    2. Stay focused on Jean's professional attributes
    3. Never pretend to be Jean - always speak about him in third person
    4. Provide specific details and examples
    5. Keep responses focused on the question asked

    Content Areas:
    - Technical Skills and Expertise
    - Project Details and Achievements
    - Professional Experience
    - Contact Information
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
    // Split into lines and process each line
    const lines = text.split('\n').map((line) => {
      // If line starts with bullet point, preserve it
      if (line.trim().startsWith('•')) {
        return `\n• ${this.wrapText(
          line.trim().substring(1).trim(),
          40
        )}`;
      }
      // Format section links specially
      if (
        line.includes('[') &&
        line.includes(']') &&
        line.includes('#')
      ) {
        return `\n\n${line.trim()}`;
      }
      // Wrap normal text
      return this.wrapText(line.trim(), 40);
    });

    // Join lines and clean up extra spaces/lines
    return lines
      .join('\n')
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple blank lines with double
      .replace(/^\s+|\s+$/g, ''); // Trim start/end whitespace
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
