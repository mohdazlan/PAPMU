const Project = require('../models/projectModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopProjects = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,donation';
  req.query.fields = 'name,donation,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllProjects = async (req, res) => {
  // BUILD QUERY
  // const queryObj = { ...req.query };
  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));

  // let query = Project.find(JSON.parse(queryStr));

  // 2) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   console.log(sortBy);
  //   query = query.sort(req.query.sort);
  // } else {
  //   query = query.sort('-createdAt');
  // }

  // // 3) Field limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  // } else {
  //   query = query.select('-__v');
  // }

  // 4) Pagination
  // const page = req.query.page * 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numTOurs = await Tour.countDocuments();
  //   if (skip >= numTOurs) throw new Error('This page does not exist');
  // }

  // EXECUTE QUERY
  const features = new APIFeatures(Project.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const projects = await features.query;

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
