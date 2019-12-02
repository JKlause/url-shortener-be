const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  urlText: {
    type: String,
    required: true
  },
  shortUrlText: String,
  count: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('url', schema);
