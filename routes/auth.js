const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../models/User');

const SECRET ='shophub_secret_key_2026';//show register page
router.get('/register',(req,res)=>{
    res.render('register',{error:null});

});
//handle register page
router.post('/register',async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        const existing=await User.findOne({email});//check if user exists
        if (existing){
            return res.render('register',{error:"email already registered"});
        }
        //Hash the password bcrypt adds a 'salt' automatically
        //10=cost  factor 
        const hashedPassword=await bcrypt.hash(password,10);
        // save new user
        const user= new User ({name,email,password:hashedPassword});
        await user.save();
        res.redirect('/login');
    }catch (err) {
        console.error(err);
        res.render('register',{error:'something went wrong'})

    }

});
// show login page
router.get('/login',(req,res) =>{
    res.render('login',{error:null});
});
 //handle login for submission
router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        // find user by email
        const user=await User.findOne({email});
        if (!user){
            return res.render('login',{error:'Invalid email or password'});
        }
        //comparing entered password with stored hash
        const isMatch=await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.render('login',{error:'Invalid email or password'})

        }
        // creating jwt token like issuing a signed ID card
        const token=jwt.sign(
            {id :user._id,name:user.name,role:user.role},
            SECRET,
            {expiresIn:'7d'}
        );

        //store token in a cookie
        res.cookie('token',token,{
            httpOnly:true, //Js in browser cannot read it
            maxAge:7*24*60*60*1000
        });
        res.redirect('/');
    }catch (err){
        console.error(err);
        res.render('login'.{error:'Something went wrong'})
    }
});

//logout
router.get('/logout',(req,res) =>{
    res.clearCookie('token');
    res.redirect('/login')
});

module.exports=router;



