const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = err.status || 500;

  if(err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError) {
    status = 400;
  }

  res.status(status);

  console.log(err);

  const error = {
    status
  };

  if(err.errmsg) error.message = err.errmsg;
  if(err.message) error.message = err.message;

  res.send(error);
};
