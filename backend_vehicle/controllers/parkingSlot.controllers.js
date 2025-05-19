const ParkingSlot = require("../models/parkingSlot.model")
const { Op } = require('sequelize');


// POST /api/parking-slots/bulk
const bulkCreateSlots = async (req, res) => {
  const { slots } = req.body;
  const createdSlots = await ParkingSlot.bulkCreate(slots, { validate: true });
  res.status(201).json({ message: 'Slots created successfully', slots: createdSlots });
};

// GET /api/parking-slots?page=1&limit=10&search=term
const listSlots = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  const { count, rows } = await ParkingSlot.findAndCountAll({
    where: {
      [Op.or]: [
        { slotNumber: { [Op.like]: `%${search}%` } },
        { status: { [Op.like]: `%${search}%` } },
        { location: { [Op.like]: `%${search}%` } }
      ]
    },
    offset: parseInt(offset),
    limit: parseInt(limit)
  });

  res.json({ total: count, page: parseInt(page), slots: rows });
};

// PUT /api/parking-slots/:id
const updateSlot = async (req, res) => {
  const slot = await ParkingSlot.findByPk(req.params.id);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });

  const { slotNumber, size, vehicleType, status, location } = req.body;
  if (slotNumber) slot.slotNumber = slotNumber;
  if (status) slot.status = status;
  if (location) slot.location = location;
  if (size) slot.size = size;
  if (vehicleType) slot.vehicleType = vehicleType;

  await slot.save();
  res.json({ message: 'Slot updated successfully', slot });
};

// DELETE /api/parking-slots/:id
const deleteSlot = async (req, res) => {
  const slot = await ParkingSlot.findByPk(req.params.id);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });

  await slot.destroy();
  res.json({ message: 'Slot deleted successfully' });
};

module.exports = {
  bulkCreateSlots,
  listSlots,
  updateSlot,
  deleteSlot
};
