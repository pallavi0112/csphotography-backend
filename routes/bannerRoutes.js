const express = require('express');
const bannerRouter = express.Router();

bannerRouter.post('/create');
bannerRouter.get('/');
bannerRouter.get('/:id');
bannerRouter.put('/update/:id' )
bannerRouter.delete(':/id')