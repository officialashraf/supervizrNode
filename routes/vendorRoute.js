const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/vendor-login', vendorController.vendorLogin);
router.post('/verify-vendor', vendorController.verifyOTPVendor);
router.get('/getVendor/:vendorId', vendorController.getVendorDetails);
router.put('/update-vendor/:vendorId', vendorController.updateVendor);
router.delete('/delete/:vendorId', vendorController.vendorDelete);
router.post('/trackVendor', vendorController.getTrackVendor);//check it
router.post('/vendorTrackNew', vendorController.trackVendorNewRecord);//not working properly
router.post('/current-location', vendorController.currentLocation);
router.post('/update-image', vendorController.imageUpdate);

router.post('/update-batterystatus', vendorController.updateBatteryStatus);
router.post('/update-internetstatus', vendorController.updateInternetStatus);//not working--check it
router.post('/update-gpsstatus', vendorController.updateGpsStatus);

module.exports = router;