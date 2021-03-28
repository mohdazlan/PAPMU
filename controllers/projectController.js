const Project = require('../models/projectModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopProjects = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, { path: 'reviews' });
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);

exports.getProjectStats = catchAsync(async (req, res, next) => {
  const stats = await Project.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numProjects: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgFunding: { $avg: '$funding' },
        minFunding: { $min: '$funding' },
        maxFunding: { $max: '$funding' },
      },
    },
    {
      $sort: { avgFunding: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Project.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numProjectStarts: { $sum: 1 },
        projects: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numProjectStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

// /Projects-within/:distance/center/:latlng/unit/:unit
// /Projects-within/233/center/34.111745,-118.113491/unit/mi
exports.getProjectsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400
      )
    );
  }

  const projects = await Project.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      data: projects,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Project.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
// exports.aliasTopProjects = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,donation';
//   req.query.fields = 'name,donation,ratingsAverage,summary,difficulty';
//   next();
// };

// exports.getAllProjects = catchAsync(async (req, res, next) => {
//   // BUILD QUERY
//   // const queryObj = { ...req.query };
//   // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//   // excludedFields.forEach((el) => delete queryObj[el]);

//   // let queryStr = JSON.stringify(queryObj);
//   // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//   // console.log(JSON.parse(queryStr));

//   // let query = Project.find(JSON.parse(queryStr));

//   // 2) Sorting
//   // if (req.query.sort) {
//   //   const sortBy = req.query.sort.split(',').join(' ');
//   //   console.log(sortBy);
//   //   query = query.sort(req.query.sort);
//   // } else {
//   //   query = query.sort('-createdAt');
//   // }

//   // // 3) Field limiting
//   // if (req.query.fields) {
//   //   const fields = req.query.fields.split(',').join(' ');
//   //   query = query.select(fields);
//   // } else {
//   //   query = query.select('-__v');
//   // }

//   // 4) Pagination
//   // const page = req.query.page * 1;
//   // const limit = req.query.limit * 1 || 100;
//   // const skip = (page - 1) * limit;

//   // query = query.skip(skip).limit(limit);

//   // if (req.query.page) {
//   //   const numProjects = await Project.countDocuments();
//   //   if (skip >= numProjects) throw new Error('This page does not exist');
//   // }

//   // EXECUTE QUERY
//   const features = new APIFeatures(Project.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const projects = await features.query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: projects.length,
//     data: {
//       projects,
//     },
//   });
// });

// exports.getProject = catchAsync(async (req, res, next) => {
//   const project = await Project.findById(req.params.id);

//   if (!project) {
//     return next(new AppError('No project found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       project,
//     },
//   });
// });

// exports.createProject = catchAsync(async (req, res, next) => {
//   const newProject = await Project.create(req.body);
//   console.log(req.body);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       project: newProject,
//     },
//   });
// });

// exports.updateProject = catchAsync(async (req, res, next) => {
//   const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!project) {
//     return next(new AppError('No Project found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       project,
//     },
//   });
// });

// exports.deleteProject = catchAsync(async (req, res, next) => {
//   const project = await Project.findByIdAndDelete(req.params.id);

//   if (!project) {
//     return next(new AppError('No Project found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// exports.getProjectStats = catchAsync(async (req, res, next) => {
//   const stats = await Project.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 3.0 } },
//     },
//     {
//       $group: {
//         _id: '$difficulty',
//         numProjects: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgDonation: { $avg: '$donation' },
//         minDonation: { $min: '$donation' },
//         maxDonation: { $max: '$donation' },
//       },
//     },
//     { $sort: { avgDonation: 1 } },
//   ]);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// });

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;
//   const plan = await Project.aggregate([
//     { $unwind: '$startDates' },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numProjectStarts: { $sum: 1 },
//         Projects: { $push: '$name' },
//       },
//     },
//     {
//       $addFields: { month: '$_id' },
//     },
//     {
//       $project: { _id: 0 },
//     },
//     {
//       $sort: { numProjectStarts: -1 },
//     },
//   ]);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       plan,
//     },
//   });
// });
