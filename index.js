const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');
const cookieParser = require('cookie-parser');

dotenv.config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const { connectDB } = require('./database/mongodb');
const databaseRouter = require('./api/database');
const chatbotRouter = require('./api/chatbot');

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT;
const FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(/\/$/, '');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/database', databaseRouter);
app.use('/api/chatbot', chatbotRouter);

connectDB().then(() => {
    console.log(`MongoDB connected successfully`);
    server.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
}).catch((error) => {
    console.error(error);
    process.exit(1);
});

