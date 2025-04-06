const { signup } = require('../controllers/AuthController');
const { login } = require('../controllers/AuthController');
const { signupValidation } = require('../middlewares/AuthValidation');
const { loginValidation } = require('../middlewares/AuthValidation');

const router=require('express').Router();

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

module.exports=router;