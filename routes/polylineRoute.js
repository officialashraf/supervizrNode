const express = require('express');
const polylineController = require('../controllers/polylineController');
const router = express.Router();

router.post('/submit-polyline', polylineController.submitpolyline);
router.post('/get-polyline', polylineController.getpolyline);

module.exports = router;
