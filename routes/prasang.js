/**
 * Created by nirdosh on 25.07.15.
 */
var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host:'localhost:9200'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      query: {
        match: {
          id: req.body.id
        }
      }
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);
    res.render('prasangs', { data:resp.hits.hits });
  }, function (err) {
    console.trace(err.message);
  });


});

// PRASANGS
router.get('/prasangs', function(req, res, next) {
  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      fields:['title'],
      from: req.query.from || 0,
      size: req.query.size || 10,
      query: {
        match_all:{}
      }
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);
    res.render('prasangs',{ data:resp.hits.hits,
      from: req.query.from || 0,
      size: req.query.size || 10});
  }, function (err) {
    console.trace(err.message);
  });

});

router.get('/', function(req, res, next) {
  res.render('addPrasang', { title: 'ADD PRASANG'});
});

router.get('/editPrasang', function(req, res, next) {


  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      query: {
        match: {
          _id: req.query.id
        }
      }
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);
    res.render('editPrasang', { prasang:resp.hits.hits });
  }, function (err) {
    console.trace(err.message);
  });
});

router.post('/submitPrasang', function (req,res){
      var tagsAry = req.body.tags;
      var prasangBody = req.body.content.replace(/(?:\r\n|\r|\n)/g,'');

      var jsonResp = {  title: req.body.title,
        language: req.body.lang,
        tags:tagsAry,
        main_charachter: req.body.main_charachter,
        body: req.body.content
      };

      var json = JSON.stringify(jsonResp);

      client.index({
        index:'satsang',
        type:'prasangs',
        body:json
      }, function(error, response){
        if(error){
          console.log(error);
        }
      });
      res.redirect('/addPrasang');
    }
);

router.post('/searchPrasang', function(req,res){

  console.log(req.body);

  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      fields:['title'],
      query: {
        bool:{
          should:[
            {match :{ language: req.body.lang } },

            {match :{ title: req.body.text } },
            {  match :{ body: req.body.text  } },
            {match :{ tags: req.body.tags } },
            {match :{ main_charachter: req.body.main_charachter } }
          ]
        }
      }
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);
    res.render('listPrasangs',{data:resp.hits.hits});
  }, function (err) {
    console.trace(err.message);
    res.send(err);
  });

});

router.post('/updatePrasang',function(req,res){

  console.log(req.body);

  client.update({
    index: 'satsang',
    type: 'prasangs',
    id:req.query.id,
    body:{
      doc : req.body
    }
  },function(error,response){
    if(error){
      console.error(error);
    }else{
      res.redirect('/');
    }
  });
});

router.get('/prasang', function(req,res){

  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      query: {
        match: {
          _id: req.query.id
        }
      }
    }
  }).then(function (resp) {
    console.log(resp);
    res.render('prasang', { prasang: resp.hits.hits });
  }, function (err) {
    console.trace(err.message);
  });
});

router.get('/deletePrasang',function(req,res){
  console.log(req.query.id);
  client.delete({
    index: 'satsang',
    type: 'prasangs',
    id: req.query.id
  }, function(error, response){
    if(error){
      console.log(error);
    } else{
      res.redirect('/');
    }
  });
});
module.exports = router;