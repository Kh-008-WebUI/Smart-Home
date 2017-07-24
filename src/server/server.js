const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const router = express.Router();
const userRoutes = require('./routes/users.js');
const notificationRoutes = require('./routes/notifications.js');
const devicesRoutes = require('./routes/devices.js');
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use('/api', router);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/devices', devicesRoutes);

app.listen(port, () => {
  console.log(`node server is working on port ${port}...`);
});

// mongoose.createConnection(db.url);
mongoose.connect(db.url);
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Connected to database!');
});
