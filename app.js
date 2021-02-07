const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/projects', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
    },
  });
});

app.get('/api/v1/projects/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  if (id > projects.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const project = projects.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

app.post('/api/v1/projects', (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
  });
});

app.patch('/api/v1/projects/:id', (req, res) => {
  if (req.params.id > projects.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour ...>',
    },
  });
});

app.delete('/api/v1/projects/:id', (req, res) => {
  if (req.params.id > projects.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
