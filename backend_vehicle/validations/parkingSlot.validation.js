const Joi = require("joi");

const bulkCreateSchema = Joi.object({
  slots: Joi.array()
    .items(
      Joi.object({
        slotNumber: Joi.string().required(),
        size: Joi.string().valid("Small", "Medium", "Large").required(),
        vehicleType: Joi.string().valid("Car", "Truck", "MotorCycle", "Bicycle"),
        status: Joi.string()
          .valid("Available", "Occupied")
          .default("Available"),
        location: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

const updateSlotSchema = Joi.object({
  slotNumber: Joi.string(),
  size: Joi.string().valid("Small", "Medium", "Large").required(),
  vehicleType: Joi.string().valid("Car", "Truck", "MotorCycle", "Bicycle"),
  status: Joi.string().valid("Available", "Occupied").default("Available"),
  location: Joi.string(),
}).min(1);

module.exports = {
  bulkCreateSchema,
  updateSlotSchema,
};
