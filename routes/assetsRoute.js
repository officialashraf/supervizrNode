const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetsController');
const { taskDocumentUploadHandler } = require('../middlewares/multer-config');

// Define your all task Controller route
router.post('/create',taskDocumentUploadHandler.fields([
    { name: 'assetDocument', maxCount: 1 }]),
    assetsController.createAsset);

// router.post('/create', assetsController.createReimbrushment);

router.post('/list', assetsController.assetsList);
router.get('/edit/:assetId', assetsController.assetsEdit);

router.post('/update',taskDocumentUploadHandler.fields([ { name: 'assetDocument', maxCount: 1 }]), assetsController.assetsUpdate);

router.delete('/delete/:assetId', assetsController.assetsDelete);




module.exports = router;