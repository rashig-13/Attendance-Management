const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const teacherschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:password,
        required:true
    },
    
    
})

mongoose.model("Teacher",teacherschema)