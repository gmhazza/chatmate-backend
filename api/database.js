const express = require('express');
const { createUser, findAllUser } = require('../database/query');

const router = express.Router();

router.post('/register/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const results = await createUser(name, email, password);
        res.status(200).json(results);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});
router.get('/get/all/user', async (req, res) => {
    try {
        const results = await findAllUser();
        res.status(200).json(results);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

module.exports = router;