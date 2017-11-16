var express = require('express');
var router = express.Router();
//var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;


router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Sign Up Page:' });
    console.log('inside GET signup');
});


var signup_schema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String,
    address   : String,
    phone     : String,
    password: String
});

var Users = mongoose.model('Users', signup_schema);

function createUser(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}




router.post('/register', function (req,res) {
var firstname = req.body.firstname;
var lastname = req.body.lastname;
var address = req.body.address;
var phone = req.body.phone;
var email = req.body.email;
var password = req.body.password;
var password2 = req.body.password2;


req.checkBody('firstname', 'first name is required').notEmpty();
req.checkBody('lastname', 'last name is required').notEmpty();
req.checkBody('address', 'address is required').notEmpty();
req.checkBody('phone', 'phone number is required').notEmpty();
req.checkBody('email', 'Email is not valid').isEmail();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords do not match').equals(req.body.password2);

var errors = req.validationErrors();

if (errors) {
    res.render('signup', {
        errors: errors
    });
} else {
    console.log('5');
    var newUser = new Users({
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
        email: email,
        password : password
    });


    createUser(newUser, function(err, users){
        console.log(users);
        if(err) throw err;
        console.log(users);
    });



    req.flash('success_msg', 'Successfully Registered');
    console.log('6');
    res.redirect('/login');
}});



/*
router.post('/register', function (req,res) {
    console.log('inside signup');
    var myData = new Users(req.body);
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
*/




module.exports = router;
