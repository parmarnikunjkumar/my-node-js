var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host:'localhost:9200'
});
var passport = require('passport');

/* GET home page. */
router.get('/',passport.authenticate('basic',{session:false}), function(req, res, next) {

  res.render('home',{username:req.body.username,password:req.body.password });
  //res.render('home', { title: 'Express', msg:' My message', user: req.body.user });
});

router.post('/login', function(req,res){
    if(req.body.username =='sevak' && req.body.password == 'iamgunatit'){
      res.render('home');
    }
  else{
      res.render('login');
    }
});


module.exports = router;
