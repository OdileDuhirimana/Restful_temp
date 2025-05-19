const Vehicle = require('../models/vehicle.model')
const { Op } = require('sequelize');

// Create Vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { plateNumber, vehicleType, size, model, color, Year } = req.body;
    const vehicle = await Vehicle.create({
      plateNumber,
      vehicleType,
      size,
      model,
      color,
      Year,
      userId: req.user.id
    });
    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get paginated/searchable vehicles
exports.getVehicles = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Vehicle.findAndCountAll({
      where: {
        [Op.or]: [
          { plateNumber: { [Op.like]: `%${search}%` } },
          { model: { [Op.like]: `%${search}%` } },
          { color: { [Op.like]: `%${search}%` } }
        ]
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({ total: count, page: parseInt(page), vehicles: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Vehicle
exports.updateVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (vehicle.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await vehicle.update(req.body);
    res.json({ message: 'Vehicle updated', vehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Vehicle
exports.deleteVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (vehicle.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.bulkCreateVehicles = async (req, res) => {
  const userId = req.user.id;
  const vehicles = req.body.map(vehicle => ({
    ...vehicle,
    userId
  }));

  try {
    const created = await Vehicle.bulkCreate(vehicles);
    res.status(201).json({ message: 'Vehicles added successfully', created });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

