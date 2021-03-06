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
            insertDocument(db,JSON.parse(JSON.stringify(req.body)), function() {
                db.close();
            });
        });
        res.send(200);
    })


var insertDocument = function(db,data, callback) {
    console.log("-",typeof data,"-");
    //console.log("-",typeof data.data,"-");
    //var dat= JSON.parse(JSON.stringify(data.data));

    //var dat= JSON.parse(data);
    //console.log("-",typeof dat,"-");
    //console.log("-",dat,"-");
    //dat.data =  dat.data.replace(new RegExp(',', 'g'),', ');
    data.data =  data.data.replace(new RegExp('{', 'g'),'{"').replace(new RegExp(':', 'g'),'":').replace(new RegExp(',', 'g'),',"');
    //data.data =  data.data.replace(new RegExp(':', 'g'),'":');
    //data.data =  data.data.replace(new RegExp(',', 'g'),',"');
    var dat= JSON.parse(data.data);
    console.log("-",dat,"------------------------------------++++++++-------******0011222333333");
    //console.log("-",dat.boiler,"-",dat.h0);
    //console.log("-",JSON.parse(JSON.stringify(dat.data)).boiler,"-");
    //console.log("-",JSON.parse(dat.data).boiler,"-");
    //console.log("-",typeof JSON.parse(JSON.stringify(dat.data)),"-");
    db.collection('temp').insertOne( {
    boiler:dat.boiler,
        t0:dat.t0,
        h0:dat.h0,
        t1:dat.t1,
        t2:dat.t2,
        t3:dat.t3,
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
