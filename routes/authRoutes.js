const express = require('express');
const { staffLogin, createStaff , staffLogout } = require('../controllers/authController');
const isTokenVerified = require('../middleware/verifyToken')
const authRouter =  express.Router();

authRouter.post('/create', createStaff);
authRouter.post('/login', staffLogin );
authRouter.get('/logout', isTokenVerified,  staffLogout)

module.exports = authRouter;