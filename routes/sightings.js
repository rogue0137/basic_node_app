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

// // Return an array of sightings, include a unique ID with each.
// // Supported query params, all optional
// `start_date` (inclusive) (default: all time)
// `end_date` (inclusive) (default: all time)
// // `bear_type` (default: all types)
// // `zip_code` (default: all zip codes)
// `sort` (default: created timestamp, ascending. 
//   only supported value is `num_bears`)

/* GET /sighting/search */
router.get('/search', function(req, res) {
  var query = req.query;
  console.log(query);

  if (query.start_date) {
    query.created_at = new Date(query.start_date);
  }


  Sighting.find(query, {
    sort: {
        num_bears: 1 //Sort by Date Added DESC
    }
}, function (err, post) {
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