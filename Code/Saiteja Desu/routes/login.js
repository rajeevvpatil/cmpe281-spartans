var express = require('express');
var router = express.Router();
//var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login Page:' });
});

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


passport.use(new LocalStrategy(
    function(email, password, done){
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

    passport.authenticate('local',{ successRedirect : '/', failureRedirect : '/login', failureFlash: true}));

module.exports = router;
