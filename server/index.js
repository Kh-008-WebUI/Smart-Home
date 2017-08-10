const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const favicon = require('serve-favicon');
const config = require('./config/config.js');
const app = express();
const router = express.Router();
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(session({
  secret: config.secret,
  name: 'login',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
    maxAge: null
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

const ws = new WebSocket('ws://localhost:3001/');
module.exports = ws;

require('./routes/index.js')(router);
app.use('/api', router);

app.use('/', express.static(__dirname + '/../dist'));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname + '/../dist/index.html')));

mongoose.Promise = global.Promise;

mongoose.connect(config.url, { useMongoClient: true });
const database = mongoose.connection;

database.on('error', (err) => {
  console.log('Connection error:', err);
});
database.once('open', () => {
  console.log('Connected to database!');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection (ws, req) {
  ws.on('message', message => {
    wss.clients.forEach(client => {
      client.send(message);
    });
  });
});

require('./utils/chartData.js')();
server.listen(config.port, () => {
  console.log(`node server is working on port ${config.port}...`);
});
