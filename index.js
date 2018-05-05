const express = require('express');
const deviceRouter = require('./controllers/device');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/node-workshop');


app.use(express.json());
app.use('/api/device', deviceRouter);

app.listen(3001);
