var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//var MongoClient = require('mongodb').MongoClient;
//var bodyParser = require('body-parser');
//MongoClient.connect('mongodb://localhost:27017/Users', )



mongoose.connect('mongodb://localhost:27017/UserLog');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Sign Up Page:' });
    console.log('inside GET signup');
    next();
});



module.exports = router;
