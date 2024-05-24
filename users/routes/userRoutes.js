const express = require('express');
const { login, createUser, getAllUsers } = require('../controllers/userControllers');
const { authAdmin } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createUserSchema, loginSchema } = require('../validations/userValidation');

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/createuser', authAdmin, validate(createUserSchema), createUser);
router.get('/getusers', authAdmin, getAllUsers);

module.exports = router;
