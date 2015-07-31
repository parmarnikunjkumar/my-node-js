/**
 * Created by nirdosh on 29.07.15.
 */

var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host:'localhost:9200'
});

app.use(express.static(__dirname+"/public"));

app.get('/contactList',function(req,res){
  person1 = {
    name : 'Tim',
    email:'tim@gmail.com',
    number:'222-22-222'
  };
  person2 = {
    name : 'Tim',
    email:'tim@gmail.com',
    number:'222-22-222'
  };
  person3 = {
    name: 'Tim',
    email: 'tim@gmail.com',
    number: '222-22-222'
  };

  var contactList = [person1,person2,person3];
  res.json(contactList);
});


app.get('/prasangs',function(req,res){

  console.log("I receive the contact list request");

  client.search({
    index: 'satsang',
    type: 'prasangs',
    body: {
      query:{
        match_all:{
        }
      }
    }
  }).then(function (resp) {
    console.log(resp.hits.hits);
    res.json(resp.hits.hits);
  }, function (err) {
    console.trace(err.message);
    res.send(err);
  });
});

app.listen(3000);