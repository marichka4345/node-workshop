const express = require('express');
const deviceRouter = require('./controllers/device');
const deviceGroupRouter = require('./controllers/group');
const deviceLogRouter = require('./controllers/logs');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/node-workshop');


app.use(express.json());
app.use('/api/device', deviceRouter);
app.use('/api/group', deviceGroupRouter);
app.use('/api/log', deviceLogRouter);

app.listen(3001);
