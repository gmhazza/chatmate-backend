const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');
const cookieParser = require('cookie-parser');

dotenv.config();
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://chatmate-fun.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const { connectDB } = require('./database/mongodb');
const databaseRouter = require('./api/database');
const chatbotRouter = require('./api/chatbot');

app.use('/api/database', databaseRouter);
app.use('/api/chatbot', chatbotRouter);

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: 'Successful',
            message: 'Server is connected'
        });
    } catch (error) {
        res.status(500).json({
            status: 'Unsuccessful',
            message: 'Server is not connected'
        });
    }
});

connectDB().then(() => {
    console.log(`MongoDB connected successfully`);
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

