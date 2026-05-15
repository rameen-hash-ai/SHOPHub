const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const authMiddleware=require('../middleware/auth');

//Both routes use authmiddleware-must be loggedin
//show add product form
router.get('/add-product',authMiddleware,(req,res)=>{
    res.render("add_product",{error:null,success:null});
});

router.post('/add-product',authMiddleware,async(req,res)=>{
    try{
        const {name,price,originalPrice,category,brand,stock,description,image}=req.body;

        const product =new Product({
            name,
            price:parseFloat(price),
            originalPrice:parseFloat(originalPrice),
            category,
            brand,
            stock:parseFloat(stock),
            description,
            image:image || 'https://via.placeholder.com/200x160'
        });

        await product.save();
        res.render('add_product',{error:null,success:'Product added'});
    } catch(err){
        console.error(err);
        res.render('add_product',{error:'Failed to add product',success:null});
    }
});

module.exports=router;
