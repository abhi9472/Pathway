const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const  connect = async()=>{
     await mongoose.connect('mongodb://localhost/pathway')
}
module.exports = { connect}