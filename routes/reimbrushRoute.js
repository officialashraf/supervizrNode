const express = require('express');
const router = express.Router();
const reimbursementController = require('../controllers/reimbursementController');
const { taskDocumentUploadHandler } = require('../middlewares/multer-config');

// Define your all task Controller route
router.post('/create',taskDocumentUploadHandler.fields([
    { name: 'reimbursementDoc', maxCount: 1 }]),
    reimbursementController.createReimbrushment);

// router.post('/create', reimbursementController.createReimbrushment);

router.post('/list', reimbursementController.reimbrushmentList);
router.get('/edit/:reimbId', reimbursementController.reimbrushmentEdit);

router.post('/updateStatus', reimbursementController.updateStatus);

router.post('/update',taskDocumentUploadHandler.fields([
    { name: 'reimbursementDoc', maxCount: 1 }]),
    reimbursementController.reimbrushmentUpdate);

router.delete('/delete/:reimbId', reimbursementController.reimbrushmentDelete);

router.post('/reimbursement-sum', reimbursementController.getReimbursementSums);



module.exports = router;