const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const projects = await Project.find();

  // 2) Build template
  res.status(200).render('overview', {
    title: 'All Projects',
    projects,
  });
});

exports.getProject = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Projects',
  });
};
