const { Router } = require('express');
const Url = require('../model/Url');

module.exports = Router() 
  .get('/:id', (req, res, next) => {
    Url.findById(req.params.id)
      .then(url => {
        Url.findByIdAndUpdate(req.params.id, { count: url.count + 1 }, { new: true })
          .then(url => {
            return res.redirect(url.urlText);
          });
      })
      .catch(next);
  });
