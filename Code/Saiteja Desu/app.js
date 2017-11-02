var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var fs = require('fs');
var connect = require('connect');

var appconn = connect();

appconn.use(displayForm);
appconn.use(displayLoginForm);

var server = http.createServer(appconn);

var app = express();

//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

//mongoose.connect('UserLog:http://localhost:27017/UserLog');

var db = mongoose.connect('mongodb://localhost:27017/UserLog', {
    useMongoClient: true
    /* other options */
});
db.on('error', console.error.bind(console, 'connection error:'));

var Schema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String,
    createpswd: String,
    confirmpswd: String
});

var user = mongoose.model('User',Schema);

    app.post('/Registration',function (req,res) {
    new user({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        email : req.body.email,
        createpswd : req.body.createpswd,
        confirmpswd : req.body.confirmpswd
    }).save(function (err,doc) {
        if(err) res.send('!!Error');
        else   res.send('Successfully inserted!!');
    });
});
/*
var user = {
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "createpswd": password,
    "confirmpswd": gender
};

dbCollections.users.insert(user, function (err, users) {
    if (err) {
        res.send("There was a problem.");   // If it failed, return error
    }
    else {
        res.send('Successful');    // And forward to success page  --> angularjs/login.js
    }
});
*/
function displayForm(req,res,next) {
    fs.readFile('/Registration', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
    next();
}

function displayLoginForm(req,res,next){
    fs.readFile('Login.html',function (err, data) {
        res.writeHead(200, {'Content-Type':'text/html',
        'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
    next();
}

server.listen(8000);
console.log("server listening on 8000");