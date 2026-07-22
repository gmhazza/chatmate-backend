const express = require('express');
const { createUser, findAllUser, findUserByID, login, deleteUser } = require('../database/query');
const { jwt, authenticate, checkAuthentication } = require('../middleware/jwt');

const router = express.Router();

router.post('/register/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const results = await createUser(name, email, password);
        const token = jwt.sign({
                _id: results._id, name: results.name
            }, process.env.SECRET_KEY, {
                expiresIn: "7d"
            })
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        res.status(200).json(results);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const results = await login(email, password);
        const token = jwt.sign({
                _id: results._id, name: results.name
            }, process.env.SECRET_KEY, {
                expiresIn: "7d"
            })
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        res.status(200).json(results);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const results = await login(email, password);
        const token = jwt.sign({
                _id: results._id, name: results.name
            }, process.env.SECRET_KEY, {
                expiresIn: "7d"
            })
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        res.status(200).json(results);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

router.get('/logout', authenticate, async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.status(200).json({
            message: 'successfull logout'
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

router.delete('/delete/profile', authenticate, async (req, res) => {
    try {
        const results = await deleteUser(req.user._id);
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.status(200).json({
            message: 'successfull delete and logout'
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        throw error;
    }
});

router.get('/get/all/user', authenticate, async (req, res) => {
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