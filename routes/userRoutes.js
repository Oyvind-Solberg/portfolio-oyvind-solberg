const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/loginGuest', authController.loginGuest);
router.get('/logout', authController.logout);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.uploadUserFiles,
    userController.processFiles,
    userController.updateUser
  );

module.exports = router;
