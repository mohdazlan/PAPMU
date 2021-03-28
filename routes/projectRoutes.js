const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:projectId/reviews', reviewRouter);

router
  .route('/top-5-exciting')
  .get(projectController.aliasTopProjects, projectController.getAllProjects);

router.route('/project-stats').get(projectController.getProjectStats);
router.route('/monthly-plan/:year').get(projectController.getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(projectController.getProjectsWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router
  .route('/distances/:latlng/unit/:unit')
  .get(projectController.getDistances);

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    projectController.createProject
  );

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    projectController.deleteProject
  );

module.exports = router;
