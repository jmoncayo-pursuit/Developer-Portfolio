# Developer Portfolio

## Description

A modern, single-page portfolio website built with React and Vite, featuring smooth scroll navigation and an AI-powered chatbot using Google's Gemini API. The chatbot can answer questions about my skills, projects, and experience.

## Features

- Responsive, mobile-first design
- Single-page application with smooth scroll navigation
- Interactive AI chatbot assistant
- Project showcase with live demos
- Skills and experience timeline
- Contact section with direct links

## Tech Stack

- Frontend:

  - React 18
  - Vite
  - Bootstrap 5
  - React Router DOM
  - Marked (for markdown parsing)

- Backend:
  - Express
  - Google Generative AI (Gemini)
  - Dotenv for configuration

## Setup

### Backend
```bash
cd backend
npm install
npm run dev  # Runs with nodemon on port 3001
```
### Frontend
```bash
cd frontend
npm install
npm run dev  # Runs Vite dev server
```
## Environment Variables

### Backend `.env`:
- GOOGLE_API_KEY (required)
- PORT (default: 3001)
- CORS_ORIGIN
- AI_MODEL (default: 'gemini-1.5-pro')
- AI_TEMPERATURE (default: 0.7)
- AI_TOP_P (default: 0.9)
- AI_TOP_K (default: 40)
- AI_MAX_TOKENS (default: 2048)
