const { Router } = require('express');
const Url = require('../model/Url');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { urlText, shortUrlText, count } = req.body;
    Url
      .create({ urlText, shortUrlText, count })
      .then(url => {
        return res.json({
          urlText: url.urlText,
          shortUrlText: url.shortUrlText,
          count: url.count,
          id: url._id,
        });
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Url.findById(req.params.id)
      .then(url => {
        return res.json({
          urlText: url.urlText,
          shortUrlText: url.shortUrlText,
          count: url.count,
          id: url._id
        });
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Url.find()
      .then(urls => {
        return res.json(urls.map(url => {
          return {
            urlText: url.urlText,
            shortUrlText: url.shortUrlText,
            id: url._id
          };
        }));
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Url.findOneAndRemove(req.params.id)
      .then(url => {
        return res.json({
          urlText: url.urlText,
          shortUrlText: url.shortUrlText,
          count: url.count,
          id: url._id
        });
      })
      .catch(next);
  });

  //update by id (count)
