// labs = projects

const express = require("express");
const LabController = require('../controllers/LabsController');

const routes = express.Router();

routes.get('/labs', LabController.listAll);
routes.get('/skills_projectTypes', LabController.getLevelsAndSkills);

module.exports = routes;