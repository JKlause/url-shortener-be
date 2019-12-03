const { Router } = require('express');
const Url = require('../model/Url');

module.exports = Router() 
  .get('/:query', (req, res, next) => {
    //find where req.params.query equals short url or id
    Url
      .findOneAndUpdate({ shortUrlText: req.params.query }, { $inc: { count: 1 } }, { new: true })
      .then(url => {
        if(url) return res.redirect(url.urlText);
        else {
          Url
            .findByIdAndUpdate(req.params.query, { $inc: { count: 1 } }, { new: true })
            .then(url => {
              return res.redirect(url.urlText);
            })
            .catch(next);
        }
      });
  });
