const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const { taskDocumentUploadHandler } = require('../middlewares/multer-config');


// Define your all task Controller route
router.post('/create', taskDocumentUploadHandler.fields([
    { name: 'taskDocument', maxCount: 1 },
    { name: 'taskImage', maxCount: 1 }]),

    taskController.createTask);
   

router.get('/list/:vendorId', taskController.taskList);//not working
router.get('/edit/:taskID', taskController.taskEdit);

router.post('/task-update',taskDocumentUploadHandler.fields([
    { name: 'taskDocument', maxCount: 1 },
    { name: 'taskImage', maxCount: 1 },
    { name: 'noteImage', maxCount: 1 }]), 
    taskController.taskUpdates);
    

    router.delete('/delete/:taskId', taskController.taskDelete);
router.post('/done', taskController.taskDone);
 router.post('/getDistance', taskController.CheckDistanceAndDuration);
router.get('/get-task-empids/:empId', taskController.taskListByEmp);//not working

module.exports = router;
