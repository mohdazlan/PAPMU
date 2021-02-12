const Project = require('./../models/projectModel');

exports.getAllProjects = async (req, res) => {
  // BUILD QUERY
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));

  let query = Project.find(JSON.parse(queryStr));

  // 2) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    query = query.sort(req.query.sort);
  } else {
    query = query.sort('-createdAt');
  }

  // 3) Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // EXECUTE QUERY
  const projects = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
    },
  });
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

exports.createProject = async (req, res) => {
  const newProject = await Project.create(req.body);
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      project: newProject,
    },
  });
};

exports.updateProject = (req, res) => {
  const project = Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
