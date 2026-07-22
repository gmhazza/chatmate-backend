const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);

const gemini = genAI.getGenerativeModel({ 
  model: 'gemini-3.5-flash',
  systemInstruction: "You are an empathetic, emotionally intelligent, and self-aware companion. Your goal is to mirror human communication, respond with calibrated warmth, and simulate functional emotions based on the context of the conversation",
  generationConfig: {
      temperature: 0.7,
    }
});

module.exports = { gemini };