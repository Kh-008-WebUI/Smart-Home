const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const router = express.Router();
const port = 3001;
const User = require('./models/users.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'good' });
});
app.use('/api', router);


router.get('./users', (req, res) => {
    User.find
});

// mongoose.createConnection(db.url);
const mongodb = mongoose.createConnection(db.url);

mongodb.on('error', console.error.bind(console, 'connection error:'));
mongodb.once('open', () => {
  console.log('Connected!');
});

// app.use('/api', router);
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err);
//   require('./app/routes')(router, app, database);

//   app.listen(port, () => console.log('node server is working on port 3012...'));              
// })

app.listen(port, () => {
  console.log(`node server is working on port ${port}...`);
});