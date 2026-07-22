const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

const server = http.createServer(app);
dotenv.config();

const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http:localhost:5173'
}));


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'successful'
    });
});

server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});