const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

const multer = require('multer');
const upload = multer();


// Define your all task Controller route
router.post('/create', clientController.createClient);//check it 
router.get('/list/:vendorId', clientController.clientList);//vendor id issue
router.get('/details/:clientId', clientController.clientDetails);
router.delete('/delete/:clientId', clientController.clientDelete);
router.post('/update-client', clientController.updateClients);

module.exports = router;
