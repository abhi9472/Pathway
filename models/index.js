const mongoose = require('mongoose')
const urlSchema = mongoose.Schema({
    shortId : {
        type:String ,
        required:true ,
        unique:true
    },
    redirectUrl : {
        type:String ,
        required:true,

    },
    visitedHistory : [{
        timeStamps : {type:Number}
    }] , 
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
} , {timeStamps:true}
)
const URL = mongoose.model('url' , urlSchema);
module.exports = URL    