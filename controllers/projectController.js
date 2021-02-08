const fs = require('fs');

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllProjects = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
    },
  });
};

exports.getProject = (req, res) => {
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

exports.createProject = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
  });
};

exports.updateProject = (req, res) => {
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

exports.deleteProject = (req, res) => {
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
