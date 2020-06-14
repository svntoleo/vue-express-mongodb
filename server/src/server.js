//LOAD .ENV
require('dotenv').config();

//APP CORE
const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());

// Connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database!'));

//Routes
const router = require('./router');
server.use('/characters', router);

//Start Server
server.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`));






