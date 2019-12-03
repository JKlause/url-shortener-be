const { Router } = require('express');
const Url = require('../model/Url');


module.exports = Router()
  .post('/', (req, res, next) => {
    const { urlText, count, shortUrlText } = req.body;
    const modelUrl = setUrl({ urlText, count, shortUrlText });
    Url
      .create({ ...modelUrl, user: req.user._id })
      .then(url => {
        return res.json(setUrl(url));
      })
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Url.findById(req.params.id)
      .then(url => {
        return res.json(setUrl(url));
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Url.find({ user: req.user._id })
      .then(urls => {
        return res.json(urls.map(url => {
          return setUrl(url);
        }));
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Url.findByIdAndDelete(req.params.id)
      .then(url => {
        return res.json(setUrl(url));
      })
      .catch(next);
  });


function setUrl(url) {
  const sendUrl = {
    urlText: url.urlText,
    count: url.count,
    id: url._id,
  };
  if(url.shortUrlText)
    sendUrl.shortUrlText = url.shortUrlText;
  return sendUrl;
}

