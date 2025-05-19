const express = require('express');
const router = express.Router();
const {bulkCreateSlots, listSlots, updateSlot, deleteSlot} = require("../controllers/parkingSlot.controllers")
const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")
const validate = require('../middleware/validate.middleware');
const { bulkCreateSchema, updateSlotSchema } = require('../validations/parkingSlot.validation');

router.use(auth.authenticate)
router.post('/bulk', role.restrictTo("admin"), validate(bulkCreateSchema), bulkCreateSlots);
router.get('/', role.restrictTo("admin"),listSlots);
router.put('/:id', role.restrictTo("admin"), validate(updateSlotSchema), updateSlot);
router.delete('/:id', role.restrictTo("admin"), deleteSlot);

module.exports = router;
