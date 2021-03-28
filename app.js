const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
// const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('common'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json());
app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 💥');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 2) ROUTE HANDLERS

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES
app.get('/', (req, res, next) => {
  res.status(200).render('base', {
    project: 'Projek Asnaf Bintulu',
    user: 'Azlan',
  });
});

app.get('/overview', (req, res, next) => {
  res.status(200).render('overview', {
    title: 'All Projects',
  });
});

app.get('/project', (req, res, next) => {
  res.status(200).render('project', {
    title: 'Projek Asnaf Sibu',
  });
});
app.use('/api/v1/tours', projectRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// simple
// app.all('*', (req, res, next) => {
//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   err.status = 'fail';
//   err.statusCode = 404;
//   next(err);
// });

// advanced
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// basic
// app.use((err, req, res, next) => {
//   console.log(err.stack);

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

// advanced
app.use(globalErrorHandler);

module.exports = app;
