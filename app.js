const express = require('express');
const fs = require('fs');
const { get } = require('http');

const app = express();
app.use(express.json());

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllProjects = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
    },
  });
};

const getProject = (req, res) => {
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
};

const createProject = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
  });
};

const updateProject = (req, res) => {
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
};

const deleteProject = (req, res) => {
  if (req.params.id > projects.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    data: null,
  });
};

// app.get('/api/v1/projects', getAllProjects);
// app.get('/api/v1/projects/:id', getProject);
// app.post('/api/v1/projects', createProject);
// app.patch('/api/v1/projects/:id', updateProject);
// app.delete('/api/v1/projects/:id', deleteProject);

app.route('/api/v1/projects').get(getAllProjects).post(createProject);
app
  .route('/api/v1/projects/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
