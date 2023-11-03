const express = require('express')
const app = express();
const path = require('path')
const urlRoute = require('./routes/url.js')
const userRoute = require('./routes/user.js')
const {connect} = require('./db/index.js')
const port = 8001;
const staticRouter = require('./routes/staticRouter.js')
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly , checkAuth} = require('./middleware/auth.js')

app.use(express.static('public'));
app.set("view engine" , "ejs")
app.set( "views",path.resolve("./view"))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())

app.use("/url" ,restrictToLoggedInUserOnly, urlRoute)
app.use("/user", userRoute )
app.use('/' , checkAuth ,staticRouter)
app.listen(port , async()=>{
    await connect();
    console.log('mongodb connected successfully')
    console.log(`server is running on ${port}`)
})