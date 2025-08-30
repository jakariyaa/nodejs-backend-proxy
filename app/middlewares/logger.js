const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  if (req.body) {
    console.log(req.body);
  }
  next();
};

module.exports = logger;
