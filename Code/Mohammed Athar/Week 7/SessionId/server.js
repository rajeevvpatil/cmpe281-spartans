var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({secret: 'ssshhhhh'}));

var sess;
app.get('/',function(req,res){
    sess=req.session;

    sess.email; 
    sess.username; 
});