const mongoose =require('mongoose')

const singerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required:true
    }
})

const Singer = mongoose.model('Singer',singerSchema);

module.exports = Singer;