const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userschema = new mongoose.Schema({
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
    isPresent :{
        type: Boolean,
        required:false
    }
    
})

mongoose.model("User",userschema)