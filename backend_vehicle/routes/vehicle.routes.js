const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const auth = require('../middleware/auth.middleware');
const validate = require("../middleware/validate.middleware");
const { createVehicleSchema, updateVehicleSchema } = require('../validations/vehicle.validator');
const Joi = require('joi');

router.use(auth.authenticate);

router.post('/',validate(createVehicleSchema), vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.put('/:id', validate(updateVehicleSchema), vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);
router.post('/bulk', validate(Joi.array().items(createVehicleSchema)), vehicleController.bulkCreateVehicles);


module.exports = router;
