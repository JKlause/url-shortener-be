const { Router } = require('express');
const Url = require('../model/Url');

module.exports = Router() 
  .get('/:id', (req, res, next) => {
    Url.findByIdAndUpdate(req.params.id, { $inc: { count: 1 } }, { new: true })
      .then(url => {
        return res.redirect(url.urlText);
      })
      .catch(next);
  });
