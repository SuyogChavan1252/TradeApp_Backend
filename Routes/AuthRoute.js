const { Signup, Login, Logout, GetUserInfo } = require('../Controllers/AuthController');
const { userVerification } = require('../MiddleWares/AuthMiddleware'); // Ensure correct path
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/signup', Signup);  // Handles signup requests
router.post('/login', Login);    // Handles login requests
router.post('/logout', Logout);
router.get('/user-info', GetUserInfo);
router.post('/', userVerification); // Middleware to verify user JWT

module.exports = router;
