const express = require('express')
const {restrictToLoggedInUserOnly , checkAuth} = require('../middleware/auth')
const{generateShortURL ,redirectURL , getAnalytics ,deleteUrl} = require('../controller/index.js')

const router = express.Router();
router.post('/' , generateShortURL)
router.get('/:shortId' , redirectURL)
router.delete('/delete/:id',restrictToLoggedInUserOnly , deleteUrl)
router.get('/analytics/:id' , getAnalytics)
module.exports = router