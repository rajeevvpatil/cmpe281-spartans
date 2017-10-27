var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require('./models/geners');
//Connect to Mongoose
mongoose.connect('mongodb://localhost/gamecart');
var db = mongoose.connection

app.get('/', function(req,res){
    res.send('App Working');
});

app.get('/api/geners',function(req,res){
Genre.getGeners(function(err,geners){
    if(err){
        throw err;
    }
    res.json(geners);
});
});

app.listen(3000);
console.log('Running on port 3000...');
