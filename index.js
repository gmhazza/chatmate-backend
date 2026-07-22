const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');
const cookieParser = require('cookie-parser')

dns.setServers(['1.1.1.1', '8.8.8.8']);

const { connectDB } = require('./database/mongodb');
const databaseRouter = require('./api/database')

const app = express();

const server = http.createServer(app);
dotenv.config();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
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