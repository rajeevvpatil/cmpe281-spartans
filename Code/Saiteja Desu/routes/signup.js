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
});
console.log('after GET signup');

var signup_schema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String,
    createpswd: String,
    confirmpswd: String
});

var userlogin = mongoose.model('userlogin', signup_schema);
console.log('before signup');
router.post('/signup', function (req,res) {
    console.log('inside signup');
    var myData = new userlogin(req.body);
    console.log("Inside post" +myData);
    console.log(
        'you have reached inside create a user ',
        JSON.stringify(req.body)
    );
    myData.save(function (err,myData) {
        if(err){return next (err);}
        res.send('Successfull');
    });

});


module.exports = router;
