﻿var express = require('express');
var router = express.Router();

var connection = require('../tediousConnection');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    async.waterfall([
        (next) => {
            let request = new Request(
            'SELECT prize_id, picture_url FROM prize WHERE room_id = @ID ORDER BY priority;',
            (err, rowCount, rows) => {
		console.log(rows);
                next(null, rows);
            });
            
            request.addParameter('ID', TYPES.NChar, req.session.user.id);
            connection.execSql(request);
        },
        (prizes, next) => {
            let request = new Request(
            'SELECT card_url FROM card WHERE room_id = @ID;',
            (err, rowCount, rows) => {
		console.log(rows);
		next(null, prizes, rows[0].value);
            });
        }],
    (err, prizes, card_url) => {
        if(err){
            console.log("guest bingocard error");
        }
        res.render('bingocard', { prizes: prizes, style_url: card_url });
    });
});

router.get('/janken', function(req, res, next) {
	res.render('janken_mobile.html');
});

router.get('/nolottery', function(req, res, next) {
	res.render('no_lottery', { userName: req.session.user.name });
});

router.get('/lottery', function(req, res, next) {
	res.render('simple_lottery');
});

router.get('/attack25lottery', function(req, res, next) {
    res.render('景品Attack25参加者.html');
});

module.exports = router;
