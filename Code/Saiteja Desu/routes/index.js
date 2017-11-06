var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Game Cart' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Sign Up Page:' });
    console.log('inside GET signup');
});



module.exports = router;
