const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 💥');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/projects', getAllProjects);
// app.get('/api/v1/projects/:id', getProject);
// app.post('/api/v1/projects', createProject);
// app.patch('/api/v1/projects/:id', updateProject);
// app.delete('/api/v1/projects/:id', deleteProject);

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
