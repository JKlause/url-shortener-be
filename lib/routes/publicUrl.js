const { Router } = require('express');
const GeoIP = require('simple-geoip');
const Url = require('../model/Url');
const Hit = require('../model/Hit');

module.exports = Router() 
  .get('/:query', (req, res, next) => {
    Url
      .findOneAndUpdate({ shortUrlText: req.params.query }, { $inc: { count: 1 } }, { new: true })
      .then(url => {
        if(url) {
          createHit(url.id, req, next);
          return res.redirect(url.urlText);
        }
        else {
          Url
            .findByIdAndUpdate(req.params.query, { $inc: { count: 1 } }, { new: true })
            .then(url => {
              createHit(url.id, req, next);
              return res.redirect(url.urlText);
            })
            .catch(next);
        }
      });
  });


function createHit(id, req, next) {
  const hit = {
    urlId: id,
    time: new Date()
  };

  const ip = req.connection.remoteAddress;
  let lat;
  let lng;

  if(ip) {
    const geoIP = new GeoIP('at_0yGyaUyqRlR2rA4t0a5ZSy7kAOGlF');
    geoIP.lookup(ip, (err, data) => {
      if(err) throw err;
      lat = data.location.lat;
      lng = data.location.lng;
    });
    if(lat && lng) hit.location = { lat, lng };
  }

  Hit
    .create(hit)
    .then(hit => hit)
    .catch(next);
}
