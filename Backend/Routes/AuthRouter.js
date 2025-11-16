const express = require('express');
const { signup, login, logout } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middileware/AuthValidation');
const app = express();
const router = express.Router();

router.post('/login',loginValidation, login);
router.post('/signup', signupValidation,signup);

router.post('/logout', logout);

module.exports = router;