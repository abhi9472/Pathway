const USER = require('../models/user')
const {setUser} = require("../services/auth")
const { v4: uuidv4 } = require('uuid');
async function handleUserSignUp(req, res){

    const{ name , email , password}= req.body;
    try {
     
    await USER.create({
        name,
        email,
        password,
    })
    return res.status(201).json({
        message : 'user created '
    })
} catch (error) {
        return res.status(400).json({
            message : 'user already exists'
        })    
    }
    
}
async function login(req, res){
    const{ email , password}= req.body;
     const user = await USER.findOne({
        email,
        password
    })
    if(!user) return res.render('login', {
        error:'invalid user credentials'
    })
    const sessionId = uuidv4();
    setUser(sessionId, user)
    res.cookie('uid' , sessionId)
    return res.redirect('/')
}
async function updatePass(req, res){
    try {
    const emails = (req.params.email).substring(1)
    const  pass = req.body.pass ;
    const user = await USER.findOneAndUpdate({email :emails},  {password : pass} , {new :true})
    return res.status(200).json({
        message : 'pasword updated successfully'
    })} catch (error) {
        console.log(error)
      return res.status(400).json({
        err : error
      })   
    }
}
async function checkEmail(req, res){
    try {
        const email = (req.params.email).substring(1)
        
        const user = await USER.findOne({email:email})
            if(user) { return res.status(200).json({
                message : "user exists"
            }) } else {
                return res.status(400).json({
                    message :"no user exists with this email "
                })
            }
    } catch (error) {
        return res.status(400).json({
            message :"no user exists with this email"
        })
    }
}
module.exports = {handleUserSignUp , login ,updatePass,checkEmail}