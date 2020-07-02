const AppError = require('../utilities/appError');

const handleResourceNotFound = () => {
  const message = 'Kan ikkje finne forespurt ressurs.';
  return new AppError(message, 404);
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programing or other unknown error
  console.log('Error', err);
  return res.status(500).json({
    status: 'Error',
    message: 'Noko gjekk gale. Vennlegst prøv igjen seinare',
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.statusCode === 404) error = handleResourceNotFound();

    sendErrorProd(error, req, res);
  }
};
