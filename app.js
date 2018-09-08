const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const authController = require('./authentication/controllers/authentication_controller');
const usersController = require('./users/controllers/users_controller');
const logger = require('./util/logger');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = config.get('port') || 3000;
const MORGAN_LOG_FORMAT = NODE_ENV == 'production' ? 'combined' : 'dev';

const app = express();

app.use(morgan(MORGAN_LOG_FORMAT, {
    skip : (req, res) => res.statusCode < 400,
    stream: process.stderr
}));

app.use(morgan(MORGAN_LOG_FORMAT, {
    skip : (req, res) => res.statusCode >= 400,
    stream: process.stdout
}));

app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/users', usersController);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.send({
    success: false,
    message: err.toString()
  });
});

app.listen(PORT, () => {
    logger.info(`app listening at port ${PORT}`);
});

module.exports = app;
