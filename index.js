const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');
const cookieParser = require('cookie-parser');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const { connectDB } = require('./database/mongodb');
const databaseRouter = require('./api/database');
const chatbotRouter = require('./api/chatbot');

const app = express();

const server = http.createServer(app);
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



connectDB().then(() => {
    console.log(`MongoDB connected successfully`);
}).catch((error) => {
    console.error(error);
});

app.use('/api/database', databaseRouter);
app.use('/api/chatbot', chatbotRouter);

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});