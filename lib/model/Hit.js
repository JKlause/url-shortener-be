const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
    required: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  time: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('hit', schema);
