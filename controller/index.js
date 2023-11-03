const shortId = require('shortid')
const URL  = require('../models/index.js'); 
const { all } = require('../routes/staticRouter.js');

async function generateShortURL(req ,res){
    const ogurl =  req.body.url 
    if(!ogurl) return res.status(400).json({err : 'no url passed'})
    const sid = shortId.generate();
    await URL.create({

        shortId : sid,
        redirectUrl : ogurl ,
        visitedHistory : [],
        createdBy : req.user._id
    })
    //const allUrls = await URL.find({ createdBy : req.user._id})
    return res.redirect("/success")
}
async function getCreateTestPage(req,res){
    return res.render('make-test', {mergedArray : []})
 }
async function redirectURL(req ,res){
        const shortId  =  req.params.shortId
          await URL.findOneAndUpdate({
            shortId
        },{ $push: {
            visitedHistory : {
                timeStamps : Date.now(),
            }
        }}) 
        const temp = await URL.findOne({shortId});
        res.redirect(temp.redirectUrl)
}

async function getAnalytics(req, res){
    const shortId = req.params.id
     const result  = await URL.findOne({shortId})
     return res.status(200).json({
        "Clicks" : result.visitedHistory.length ,
        "analytics" : result.visitedHistory
     })
}
async function deleteUrl(req ,res){
    const shortid = req.params.id
    const ogshortid = shortid.substring(1);
    if(!ogshortid) console.log('something is missing ')
     const temp = await URL.findOneAndDelete({shortId : ogshortid}).then()
    const allUrls = await URL.find({ createdBy : req.user._id})
    return res.status(200).json({
        urls:allUrls
    })

}
module.exports = {generateShortURL  , redirectURL , getAnalytics ,deleteUrl,getCreateTestPage }