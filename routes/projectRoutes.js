const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router
  .route('/top-5-exciting')
  .get(projectController.aliasTopProjects, projectController.getAllProjects);

router.route('/project-stats').get(projectController.getProjectStats);
router.route('/monthly-plan/:year').get(projectController.getMonthlyPlan);

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);
router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
