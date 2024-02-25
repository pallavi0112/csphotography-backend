const express = require('express');
const router = express.Router();
const authRouter = require('./authRoutes')

router.use('/staff' , authRouter)

module.exports = router ;