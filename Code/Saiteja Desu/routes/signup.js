var express = require('express');
var router = express.Router();
//var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;


router.get('/signup', function(req, res) {
    res.sendStatus(200);
 //   res.render('signup', { title: 'Sign Up Page:' });
    console.log('inside GET signup');
});

router.get('/login', function(req, res) {
    res.sendStatus(200);
 //   res.render('login', { title: 'Login Page:' });
});

router.get('/', ensureAuthenticated, function(req, res, next) {
    res.sendStatus(200);
 //   res.render('index', { title: 'Game Cart' });
});


var signup_schema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String,
    address   : String,
    phone     : String,
    password: String
});

var Users = module.exports= mongoose.model('Users', signup_schema);

function createUser(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

function getUserByUsername(email, callback){
    console.log('inside getuserbyusername function');
    var query = {email : email};
    Users.findOne(query, callback);
}

function getUserById(id, callback){
    console.log('inside getuserbyid function');
    Users.findById(id, callback);
}

function comparePassword(candidatePassword, hash, callback){
    console.log('inside comparepswd function');
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.send('Please Log in');
        //req.flash('error_msg','You are not logged in');
      //  res.redirect('/users/login');
    }
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
     res.sendStatus(400);
    // res.render('signup', { errors: errors    });
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
    res.sendStatus(200);
    res.send('Successfully Registered');
  //  res.redirect('/login');
}});


passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"},
    function(email, password, done){
        console.log('inside passport use');
        getUserByUsername(email, function(err, users){
            //rest of the code
            if(err) throw err;
            if(!users){
                return done(null, false, {message: 'Invalid User'});
            }
            comparePassword(password, users.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, users);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }


            })

        });
    }));



passport.serializeUser(function(users, done) {
    console.log('Inside serilaizeuser');
    done(null, users.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Inside deserilaizeuser');
    getUserById(id, function(err, users) {
        done(err, users);
    });
});

router.post('/authenticate',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.sendStatus(200);
        res.send('Authentication Passed');
  //      res.redirect('/');
    });
/*
router.post('/authenticate',

    passport.authenticate('local',{ successRedirect : '/', failureRedirect : '/login', failureFlash: true}));
*/

router.get('/logout', function(req, res){
    req.logout();

    res.sendStatus(200);

    res.send('logged out');
 //   req.flash('success_msg', 'You are logged out');

 //   res.redirect('/users/login');
});



module.exports = router;
