const { startLiveTest } = require('../controller/live-test');
const URL = require('../models')
const { Question , Test} = require('../models/test')
const express =require('express')
const router = express.Router();
router.get('/' , async (req,res)=>{
    // if(!req.user) return res.redirect('/login')
    // const allUrls = await URL.find({ createdBy : req.user._id})
    return res.render("home" ,{
        
    })
})

router.get('/test' ,startLiveTest)
router.post('/addQuestion', async (req,res) => {
    const body = req.body
    const author = 'Abhishek';
    const subject = 'General';

    try{
        const result = await Question.create({
            subject: subject,
            author: author,
            question: body.question,
            correct: body.correct,
            incorrect: body.incorrect,
        })
        const allquestions = await Question.find({author, subject})
        const newArray = allquestions.map(({ question, correct, incorrect }) => ({
            question,
            correct,
            incorrect
        }));
        const mergedArray = newArray.map(({ question, correct, incorrect }) => ({
            question,
            options: [correct, ...incorrect]
        }));
        return res.status(201).render('make-test', {mergedArray})
    }
    catch(err){
        console.log(err.message)
    }
    return res.status(200)
})
router.post('/generate', async (req, res) => {
    const author = 'Abhishek';
    const subject = 'General';
    
    try {
        const questions = await Question.find({ author, subject });
    
        const newTest = new Test({
            author,
            subject,
            questions: questions.map(question => question._id)
        });
        await newTest.save();
        return res.redirect('/');
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Error generating the test.');
    }
})

router.get('/create-test', async (req, res) => {
    return res.render('make-test.ejs', {mergedArray : []})
})

router.get('/forgotPassword' , async(req ,res)=>{
    res.render("forgotpassword")
})
router.get('/success' ,async (req,res)=>{
    const allUrls = await URL.find({ createdBy : req.user._id})
   //  const pre = 'http://localhost:8001/url/'
     res.render(
        "home" , {
            urls : allUrls
        }
     )
})
router.get('/signup' , (req, res)=>{
    if(req.user) return res.redirect('/')
    res.render('signup')
})
router.get('/login' , (req, res)=>{
    if(req.user) return res.redirect('/')
    res.render('login')
})
router.get('/signout' , (req,res)=>{
     res.clearCookie('uid')
     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
     res.setHeader('Pragma', 'no-cache');
     res.setHeader('Expires','0');
     console.log("User signed out")
     return res.redirect('/')
})
module.exports = router