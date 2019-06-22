import express from 'express';
import createError from 'http-errors';

import testRouter from './routes/test';
import homeRouter from './routes/home';

// configure Express
//
const app = express();

// ---------------------------------------------------------------------

// App routes
//
app.use('/test', testRouter);
app.use('/', homeRouter);

// catch 404 and forward to error handler
//   404 responses are not the result of an error,
//   so the error-handler middleware will not capture them
app.use(function(req, res, next) {
  next(createError(404));
});

// error handling middleware - catch all the errors here
//
app.use((err, req, res, next) => {
  console.log('#### error handling middleware #############################');
  console.log(err);
  console.log('############################################################');
  res.status(422).send({ error: err.message });
});

// ---------------------------------------------------------------------

// Server Setup
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);
