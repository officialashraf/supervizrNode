const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');
const { taskDocumentUploadHandler } = require('../middlewares/multer-config');

// Define your all task Controller route

router.post('/create',taskDocumentUploadHandler.fields([
    { name: 'licenseDocument', maxCount: 1 },
    { name: 'licenseImage', maxCount: 1 }]),
        licenseController.createLicense);
        

router.post('/list', licenseController.licenseList);
router.get('/edit/:licenseId', licenseController.licenseEdit);

router.post('/update',taskDocumentUploadHandler.fields([
    { name: 'licenseDocument', maxCount: 1 },
    { name: 'licenseImage', maxCount: 1 }]),
    licenseController.licenseUpdate);
    

router.delete('/delete/:licenseId', licenseController.licenseDelete);




module.exports = router;