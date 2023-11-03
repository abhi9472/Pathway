const mongoose = require('mongoose')


const questionSchema = new mongoose.Schema({
    subject: {type : String , required: true},
    author: {type : String , required: true},
    question: { type: String,required: true},
    correct: {type: String, required: true},
    incorrect: {type: [String], required: true},
},
{timestamps: true}
)

const testSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

const Question = mongoose.model('Question', questionSchema)
const Test = mongoose.model('Test', testSchema);

module.exports = {Question, Test}