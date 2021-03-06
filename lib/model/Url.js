const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  urlText: {
    type: String,
    required: true
  },
  shortUrlText: {
    type: String,
    required: false,
    unique: true
  },
  count: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('url', schema);
