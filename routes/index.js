var express = require('express');
var router = express.Router();
var config = require('../config');
var tools = require('../js/tools');
var reque;
var page;
var pages;
var url = 'mongodb://185.86.79.240:27017/st';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server.");
//     db.close();
// });

router.route('/')
    .post(function(req, res, next) {
        console.log("index !!!!!welcome again2!");
        console.log(req.body);
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertDocument(db,req.body, function() {
            //insertDocument(db,{boiler:1,t0:23,h0:34,t1:3.00,t2:10.50,t3:23.50}, function() {
                db.close();
            });
        });
        res.send(200);
    })
    .get(function(req, res, next){
        res.send("TEST OK");
    })

var insertDocument = function(db,data, callback) {
    db.collection('temp').insertOne( {
    boiler:data.boiler,
        t0:data.t0,
        h0:data.h0,
        t1:data.t1,
        t2:data.t2,
        t3:data.t3,
        date:new Date()
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the temp collection.");
        callback();
    });
};

module.exports = router;
