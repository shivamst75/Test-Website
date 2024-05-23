const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

// Sample route
router.post('/',userController.createUser);
router.post('/testdata',userController.testRecord);
router.post('/big5data',userController.big5Record);

module.exports = router;
