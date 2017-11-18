var express = require('express');
var router = express.Router();
var config = require('../config');
var tools = require('../js/tools');
var reque;
var page;
var pages;

router.route('/')
    .post(function(req, res, next) {
        console.log("index !!!!!welcome again!");
        console.log(req.body);
        res.send(200);
    })

module.exports = router;
