const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsynch = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

const signToken = (role) => {
  return jwt.sign({ role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (role, statusCode, req, res) => {
  const token = signToken(role);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      role,
    },
  });
};

exports.login = catchAsynch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Tast inn gyldig epost og passord', 400));
  }

  if (
    email !== process.env.CLIENT_LOGIN_EMAIL ||
    password !== process.env.CLIENT_LOGIN_PASSWORD
  ) {
    return next(new AppError('Feil epost eller passord', 401));
  }

  createSendToken('admin', 200, req, res);
});

exports.loginGuest = catchAsynch(async (req, res, next) => {
  createSendToken('guest', 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsynch(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new AppError(
        'Du er ikkje innlogga! Vennlegst logg inn for å få tilgang.',
        401
      )
    );
  }

  const { role } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!role) {
    return next(new AppError('Denne polletten er ikkje gyldig.', 401));
  }

  req.role = role;
  next();
});

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (role !== req.role) {
      return next(
        new AppError(
          'Du har ikkje tillatelse til å utføre denne handlinga.',
          403
        )
      );
    }

    next();
  };
};
