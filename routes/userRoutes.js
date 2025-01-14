const express = require('express');
const router = express.Router();
const userControllerSignup = require('../controllers/userSignupController');
const userControllerLogin = require('../controllers/userLoginController');
const followController = require('../controllers/userFollowControllers');

// User registration route
router.post('/register', userControllerSignup.register);

// User login route
router.post('/login', userControllerLogin.login); 


// Follow a user
router.post('/:userId/follow', followController.follow);

// Unfollow a user
router.post('/:userId/unfollow', followController.unfollow);

router.get('/users/:userId/followStatus', followController.checkFollowStatus);

module.exports = router;
