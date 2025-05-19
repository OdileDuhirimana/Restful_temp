const Joi = require('joi');

const createVehicleSchema = Joi.object({
  plateNumber: Joi.string().required(),
  vehicleType: Joi.string().valid('Car', 'Truck', 'MotorCycle', 'Bicycle').required(),
  size: Joi.string().valid('Medium', 'Small', 'Large').required(),
  model: Joi.string().required(),
  color: Joi.string().required(),
  Year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required()
});

const updateVehicleSchema = Joi.object({
  plateNumber: Joi.string(),
  vehicleType: Joi.string().valid('Car', 'Truck', 'MotorCycle', 'Bicycle'),
  size: Joi.string().valid('Medium', 'Small', 'Large'),
  model: Joi.string(),
  color: Joi.string(),
  Year: Joi.number().integer().min(1900).max(new Date().getFullYear())
}).min(1); // At least one field must be present for update


module.exports = {
  createVehicleSchema,
  updateVehicleSchema
};

// const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// console.log(strongPasswordRegex.test("Passw0rd!")); // true
// const rwandaPlatePrivateRegex = /^R[A-Z]{2}\s\d{3}\s?[A-Z]{1,2}$/;
// const rwandaPlateGovRegex = /^(GP|CD)\s\d{4}$/;

// console.log(rwandaPlatePrivateRegex.test("RAA 123A"));    // true
// console.log(rwandaPlatePrivateRegex.test("RAB 456 XY"));  // true
// console.log(rwandaPlateGovRegex.test("GP 1234"));         // true
// console.log(rwandaPlateGovRegex.test("CD 5678"));         // true

// const rwandaValidator = {
//   nationalId: (id) => /^\d{16}$/.test(id),
//   licensePlate: (plate) => 
//     /^R[A-Z]{2}\s\d{3}\s?[A-Z]{1,2}$/.test(plate) || 
//     /^(GP|CD)\s\d{4}$/.test(plate),
//   strongPassword: (password) => 
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password),
// };

// // Test
// console.log(rwandaValidator.nationalId("1199880077661234")); // true
// console.log(rwandaValidator.licensePlate("RAA 123A"));       // true
// console.log(rwandaValidator.strongPassword("Pass@123"));     // true

// const rwandaPlateRegex = /^(R[A-Z]{2}\s?\d{3}\s?[A-Z]{1,2}|RD\s?\d{3}\s?[A-Z]|(GP|CD)\s?\d{4})$/;

// // Test cases
// console.log(rwandaPlateRegex.test("RAA 123 AB")); // true (private car)
// console.log(rwandaPlateRegex.test("RD456B"));     // true (motorcycle)
// console.log(rwandaPlateRegex.test("GP 7890"));    // true (government)
// console.log(rwandaPlateRegex.test("CD1234"));     // true (diplomatic, no space)
// console.log(rwandaPlateRegex.test("XYZ 123"));    // false (invalid format)