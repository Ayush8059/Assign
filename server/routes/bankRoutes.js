const express = require('express');
const router = express.Router();
const bankMatchController = require('../controllers/bankMatchController');
const multer = require('multer');
// const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload',upload.single('bankStatement'),bankMatchController.uploadAndMatchBankStatement);
module.exports = router;
// This code sets up the route for uploading bank statements and matching them with user transactions.