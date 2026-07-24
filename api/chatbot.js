const express = require('express');
const { jwt, authenticate, checkAuthentication } = require('../middleware/jwt');
const { SendMessage } = require('../database/query');
const { gemini } = require('../google/ai');

const router = express.Router();


router.post('/ask', authenticate, async (req, res) => {
    try {
        const results = await gemini.generateContent(req.body.prompt);
        const reply = results.response.text();
        const sendMessageResults = await SendMessage(reply, req.body.conversation_id, req.body.sender);
        res.status(200).json({
            message: reply
        });
    } catch (error) {
        res.status(409).json({message: error.message});
    }
});


module.exports = router;