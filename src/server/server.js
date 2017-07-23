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


app.use('/users', userRoutes);
app.use('/notifications', notificationRoutes);
app.use('/devices', devicesRoutes);



router.get('/', (req, res) => {
  res.json({ message: 'good' });
});

// app.use('/api', router);
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err);
//   require('./app/routes')(router, app, database);

//   app.listen(port, () => console.log('node server is working on port 3012...'));              
// })
app.use('/api', router);
app.listen(port, () => {
  console.log(`node server is working on port ${port}...`);
});

// mongoose.createConnection(db.url);
mongoose.connect(db.url);
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Connected!');
});

// mongodb.on('error', console.error.bind(console, 'connection error:'));
// mongodb.once('open', () => {
//   console.log('Connected!');
// });

