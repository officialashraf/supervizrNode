const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Define your all attendance route
router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.post('/attendance-api', attendanceController.attendanceInOut);
router.get('/list/:userId', attendanceController.allAttendece);
router.post('/distance', attendanceController.getDuration);
router.get('/autolog', attendanceController.autologOut);

module.exports = router;
