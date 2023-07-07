const express = require('express');
const {validateBody} =require('../../middlewares')
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth/auth');

const router = express.Router();

// signup = rergister
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
// signin = login
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;