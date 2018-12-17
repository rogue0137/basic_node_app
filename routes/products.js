var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bear = require('../models/bear.js');

/* GET ALL bearS */
router.get('/', function(req, res, next) {
  bear.find(function (err, bears) {
    if (err) return next(err);
    res.json(bears);
  });
});

/* GET SINGLE bear BY ID */
router.get('/:id', function(req, res, next) {
  bear.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE bear */
router.post('/', function(req, res, next) {
  bear.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE bear */
router.put('/:id', function(req, res, next) {
  bear.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE bear */
router.delete('/:id', function(req, res, next) {
  bear.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;