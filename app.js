const express=require('express');
const app=express();
const mongoose = require('mongoose');
const cors = require('cors');

 
require('./models/user');
require('./models/teacher');
const port=5000;
app.use(express.json())
app.use(cors());
app.use(require('./routes/signup'));
//connect to  mongoDB(remove <> around password otherwise lots of error)
const dbURI='mongodb+srv://rashi:rashi123@cluster0.kxxdz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI , {useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
 
 
 
app.get('/',(req,res) =>{
    res.send("helooooooooooo,rashiiiiiii");
})
 
 
 
app.listen(port,()=>{
    console.log("Server is running");
})
 
 
app.use((req,res)=>{
    res.send("404, Page not found");
})
