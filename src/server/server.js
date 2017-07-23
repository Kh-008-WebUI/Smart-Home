const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://rost:rostsmarthome@ds027688.mlab.com:27688/smart_home')
    .then(()=>{
        console.log('Start');
    })
    .catch(err => {
        console.error(err.stack);
    });

const app = express();
var deviceRouters = require('./deviceRouters');

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/devices', deviceRouters);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
