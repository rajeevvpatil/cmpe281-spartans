var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    displayForm(res);
});

var app = express();

//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

mongoose.connect('UserLog:http://localhost:27017/UserLog');


var Schema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String,
    createpswd: String,
    confirmpswd: String
});

var user = mongoose.model('user',Schema);

    app.post('/Registration',function (req,res) {
    new user({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        email : req.body.email,
        createpswd : req.body.createpswd,
        confirmpswd : req.body.confirmpswd
    }).save(function (err,doc) {
        if(err) res.json(err);
        else   res.send('Successfully inserted!!');
    });
});

function displayForm(res) {
    fs.readFile('signupform.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

server.listen(8000);
console.log("server listening on 8000");