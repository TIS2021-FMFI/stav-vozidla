module.exports.E404 = (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
};

module.exports.errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);
  let more = error.message;
  if (error.errors) {
    more = error.errors[0].message;
  }
  res.json({
    error: {
      message: `${more}`,
    },
  });
};
