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
router.get('/form', (req, res) => {
    if(!req.user) return res.redirect('/login')
    res.render('form'); // Render the "index.ejs" template
  });

router.get('/analyser',(req,res)=>{
    res.render('http://172.26.50.208:8501');
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
router.get('/', (req, res, next) => {
    res.render('home');
});
router.get('/about',(req,res)=>{
    res.render('home');
})


router.get('/resume-maker/:theme', (req, res, next) => {
    console.log("theme: ", req.params.theme);
    switch (req.params.theme) {
        case '1':
            res.render('resume-maker', { theme: "blue" });
            break;
        case '2':
            res.render('resume-maker', { theme: "green" });
            break;
        default:
            res.render('resume-maker', { theme: "green" });
            break;
    }
});


router.post('/resume-maker', (req, res, next) => {
    console.log(req.body);
    // LOWERCASE -> REMOVE SPACE -> SHORT NAME 
    const userName = req.body.name;
    const lowercaseName = userName.toLowerCase();
    const noSpaceName = lowercaseName.replace(' ', '');
    const shortName = noSpaceName.slice(0, 10);
    console.log("short name: ", shortName);


    let themeOptions = {
        leftTextColor: "rgb(91, 88, 255)",
        leftBackgroundColor: 'rgb(12, 36, 58)',
        wholeBodyColor: ' rgb(183, 182, 255)',
        rightTextColor: 'rgb(12, 36, 58)'
    };

    if (req.body.theme === 'blue') {

        // HTML TO PDF CONVERTING
        pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/docs/" + shortName + "-resume.pdf", (error, response) => {
            if (error) throw Error("File is not created");
            console.log(response.filename);
            res.sendFile(response.filename);
        });
    } else if (req.body.theme === 'green') {
        themeOptions = {
            leftTextColor: "rgb(183, 217, 255)",
            leftBackgroundColor: 'rgb(0, 119, 89)',
            wholeBodyColor: ' rgb(rgb(139, 247, 205))',
            rightTextColor: 'rgb(0, 119, 89)'
        };

        // HTML TO PDF CONVERTING
        pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/docs/" + shortName + "-resume.pdf", (error, response) => {
            if (error) throw Error("File is not created");
            console.log(response.filename);
            res.sendFile(response.filename);
        });
    } else {
        // SETTING DEFAULT VALUE
        // HTML TO PDF CONVERTING
        pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/docs/" + shortName + "-resume.pdf", (error, response) => {
            if (error) throw Error("File is not created");
            console.log(response.filename);
            res.sendFile(response.filename);
        });
    }


});


router.get('/pdf-static-resume', (req, res, next) => {
    // HTML TO PDF CONVERTING
    pdf.create(staticResume(), options).toFile(__dirname + "/docs/static-resume.pdf", (error, response) => {
        if (error) throw Error("File is not created");
        console.log(response.filename);
        res.sendFile(response.filename);
    });
});



router.get('/download-pdf', (req, res, next) => {
    const filePath = __dirname + '/docs/static-resume.pdf';
    res.download(filePath);;
});

module.exports = router