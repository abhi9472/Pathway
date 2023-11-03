const express = require('express')
const router = express.Router();
const {handleUserSignUp , login, updatePass ,checkEmail} = require('../controller/user')
router.post('/signup' ,handleUserSignUp ) 
router.post('/login' ,login ) 
router.patch('/updatePass/:email' ,updatePass )
router.post("/:email" , checkEmail)

module.exports = router;