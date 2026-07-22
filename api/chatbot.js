const express = require('express');
const { jwt, authenticate, checkAuthentication } = require('../middleware/jwt');
const {  } = require('../database/query');
const { gemini } = require('../google/ai');

const router = express.Router();


router.get('/ask', async (req, res) => {
    try {
        console.log(process.env.GOOGLE_API);
        const results = await gemini.generateContent(req.body.prompt);
        const reply = results.response.text();
        res.status(200).json({message: reply || 'no answer'});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
});


module.exports = router;