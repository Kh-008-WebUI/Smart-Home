const express = require('express');
// const mongoose = ('mongoose');
// const bodyParser = require('body-parser');
// const db = require('./config/db');
const app = express();

// const port = process.env.PORT || 3012;
const port = 3001;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers',
//   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   next();
// });
const router = express.Router();

app.get('/', (req, res) => {
  res.json({ message: 'good' });
});
// app.use('/api', router);

// app.use('/api', router);
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err);
//   require('./app/routes')(router, app, database);

//   app.listen(port, () => console.log('node server is working on port 3012...'));              
// })

app.listen(port, () => {
  console.log(`node server is working on port ${port}...`);
});