const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const { connectDB } = require('./database/mongodb');
const databaseRouter = require('./api/database')

const app = express();

const server = http.createServer(app);
dotenv.config();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}));



connectDB().then(() => {
    console.log(`MongoDB connected successfully`);
}).catch((error) => {
    console.error(error);
});

app.use('/api/database', databaseRouter);

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});