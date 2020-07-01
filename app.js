const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const sectionRouter = require('./routes/sectionRoutes');

// Start express app
const app = express();

app.enable('trust proxy');

// GLOBAL MIDDLEWARES
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'For mange forespørselar frå denne IP adressa, prøv igjen om ein time.',
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compress respons bodies
app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/sections', sectionRouter);

// Serve static assets
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(`${__dirname}/client/public`));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
  });
}

app.use(globalErrorHandler);

module.exports = app;
