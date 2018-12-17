var mongoose = require('mongoose');

var SightingSchema = new mongoose.Schema({
  bear_type: String,
  num_of_sightings: Number,
  zip_code: Number,
  notes: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sighting', SightingSchema);