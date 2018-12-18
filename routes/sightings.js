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
router.get('/search', function(req, res, next) {
  var query = req.query;

  //if there is a start date
  if (query.start_date) {
    // var start_date = new Date(start_date);
    var start_date = new Date(query.start_date);

    console.log('\tGETTING THE YEAR, MONTH, DATE');
    var year = start_date.getFullYear();
    console.log(`year: ${year}`);

    var month = start_date.getMonth();
    console.log(`month: ${month}`);

    var date = start_date.getDate();
    console.log(`date: ${date}`);

    console.log(year);
    query.created_at = {
      $gt: new Date(year, month, date),
    }
    delete query.start_date;
  }

  //if there is a end date
  if (query.end_date) {
    // var start_date = new Date(start_date);
    var end_date = new Date(query.end_date);

    console.log('\tGETTING THE YEAR, MONTH, DATE');
    var year = end_date.getFullYear();
    console.log(`year: ${year}`);

    var month = end_date.getMonth();
    console.log(`month: ${month}`);

    var date = end_date.getDate();
    console.log(`date: ${date}`);

    console.log(year);
    query.created_at = {
      $lt: new Date(year, month, date),
    }
    delete query.end_date;
  }
  console.log(query);

  //if sort -- to be implemented

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