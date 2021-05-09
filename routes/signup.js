const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User= mongoose.model('User');
const Teacher= mongoose.model('Teacher')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const requirelogin = require('../middleware/requirelogin');
 
router.get('/protected',requirelogin,(req,res)=>{
    res.send("hello");
});
 
router.post('/student_signup',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
       return res.status(422).json({error : "please fill all the fields"});
    }
    User.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser){
       return res.status(422).json({error :" user already exists with same email"});
        }
       bcrypt.hash(password,10)
       .then((hashedpassword)=>{
           const user= new User({
        name,
        email,
        password : hashedpassword
    });
    user.save()
    .then((user)=>{
        res.json({message: "saved  succefully",name:"name"});
    })
    .catch((err)=>{
        console.log(err);
    })
  
    })
    .catch((err)=>{
        console.log(err);
    })
 
})
.catch((err)=>{
        console.log(err);
    })     
    
})
 
router.post('/student_login',(req,res)=>{
    const {email , password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"});
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(!saveduser){
            return  res.status(422).json({error:"Invalid email or password"});
        }
        else{
           bcrypt.compare(password,saveduser.password)
           .then((ifmatch)=>{
               if(ifmatch){
                const token=jwt.sign({_id : saveduser._id},JWT_SECRET);
                res.json({token});
               }
               else{
                   return res.status(422).json({error:"Invalid email or password"});
               }
           })
           .catch(err=>{
               console.log(err);
           })
        }
    })
})
 
router.post('/teacher_signup',(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
       return res.status(422).json({error : "please fill all the fields"});
    }
    Teacher.findOne({email : email})
    .then((savedTeacher)=>{
        if(savedTeacher){
       return res.status(422).json({error :" Teacher already exists with same email"});
        }
       bcrypt.hash(password,10)
       .then((hashedpassword)=>{
           const teacher= new Teacher({
        name,
        email,
        password : hashedpassword
    });
    teacher.save()
    .then((teacher)=>{
        res.json({message: "saved  succefully"});
    })
    .catch((err)=>{
        console.log(err);
    })
  
    })
    .catch((err)=>{
        console.log(err);
    })
 
})
.catch((err)=>{
        console.log(err);
    })     
    
})
 
router.post('/teacher_login',(req,res)=>{
    const {email , password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"});
    }
    Teacher.findOne({email:email})
    .then((savedTeacher)=>{
        if(!savedTeacher){
            return  res.status(422).json({error:"Invalid email or password"});
        }
        else{
           bcrypt.compare(password,savedTeacher.password)
           .then((ifmatch)=>{
               if(ifmatch){
                const token=jwt.sign({_id : savedTeacher._id},JWT_SECRET);
                res.json({token});
               }
               else{
                   return res.status(422).json({error:"Invalid email or password"});
               }
           })
           .catch(err=>{
               console.log(err);
           })
        }
    })
})
 

router.get("/teacher", (req,res)=>{
    User.find()
    .then(users=>res.send({users}))
})

module.exports = router;
 
 
