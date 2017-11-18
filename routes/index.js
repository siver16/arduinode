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
    .get(function(req, res, next){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            findLast(db, function(data) {
                console.log(data);

                if(data==null){
                    db.close();
                }else{
                    res.send(data);
                }

            });
        });
    })
    .post(function(req, res, next) {
        console.log("index !!!!!welcome again2!");
        console.log(req.body);
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var data= req.body.data;
            insertDocument(db,data, function() {
                db.close();
            });
        });
        res.send(200);
    })


var insertDocument = function(db,data, callback) {
    console.log("data");
    console.log("data",data,data['boiler'],data.t1);
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

var findLast = function(db, callback) {
    var cursor =db.collection('temp').find().sort( { "_id": -1} ).limit(1);
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            callback(doc);
        } else {
            callback(null);
        }
    });
};

module.exports = router;
