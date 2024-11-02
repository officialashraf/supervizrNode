const express = require('express');
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.post('/admin-login', adminController.adminLogin);

router.post('/vendor-listing', verifyToken, adminController.vendorListing);

router.post('/add-subscription', verifyToken, adminController.addVendorSubscription);

router.post('/update-vendorstatus', verifyToken, adminController.updateVendorStatus);

router.get('/dashboard-counts',verifyToken, adminController.dashbboardCounts);

router.get('/recent-vendors',verifyToken, adminController.RecentVendorListing);


router.post('/employee-listing/:vendorId', verifyToken, adminController.getEmpList);

router.delete('/delete-employee/:employeeId', verifyToken, adminController.deleteEmployee);


module.exports = router;
