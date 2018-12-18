var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sighting = require('../models/sighting.js');

/* GET /sighting */
router.get('/', function(req, res, next) {
  Sighting.find(function (err, sightings) {
    if (err) return next(err);
    res.json(sightings);
  });
});

/* POST /sighting */
router.post('/', function(req, res, next) {
  Sighting.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /sighting/search */
router.get('/search', function(req, res) {
  var query = req.query;
  console.log(query);

  Sighting.find(query, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /sighting/:id */
router.get('/:id', function(req, res, next) {
  Sighting.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});





module.exports = router;