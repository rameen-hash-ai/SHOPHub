//import xpress and create a router
//router is like a mini-app that handles a group of routes
const jwt=require('jsonwebtoken');
const SECRET='shophub_secret_key_2026';
const express = require('express');
const router =express.Router();
const Product=require('../models/Product');//importing path module to work with file paths
//Home page

function getUser(req) {
    try{
        return jwt.verify(req.cookies.token,SECRET);
    } catch{
        return null;
    }
}




router.get('/',async (req,res)=>{
   try{
    //fetching 4 products
    const featuredProducts=await Product.find().limit(4); //fetching 4 products from the database
    res.render('index',{products: featuredProducts,user:getUser(req)}); //rendering the index.ejs file and passing the featured products to it  
    }catch(err){
        console.error(err);
        res.status(500).send('error');
    }
});


router.get('/products',async (req,res)=>{
    try{
        const searchQuery=req.query.search||'';
        const categoryFilter= req.query.category||'';
        const page=parseInt(req.query.page)||1;
        const limit=6;//products per page
        const skip=(page-1)*limit;



        let filter={};
        if(searchQuery){
            filter.name={$regex:searchQuery,$options:'i'}; //case-insensitive search for product name
        }
        if(categoryFilter){
            filter.category=categoryFilter;
        }
        const totalCount=await Product.countDocuments(filter);
        const totalPages=Math.ceil(totalCount/limit);
        const products=await Product.find(filter).skip(skip).limit(limit);

        const categories=await Product.distinct('category'); 

        res.render('products',{
            products,
            searchQuery,
            categoryFilter,
            totalCount,
            currentPage:page,
            totalPages,user:getUser(req)
        });

        

    }catch(err){
        console.error(err);
        res.status(500).send('error');
    }
   
});//send the products.html file when the /products route is accessed

router.get('/products/:id',async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id); //fetching the product details from the database using the product id
        if (!product){
            return  res.status(404).render('error'); //if product not found, render the error page

        }
        const relatedProducts=await Product.find({category:product.category,_id:{$ne:product._id}}).limit(4); //fetching related products from the database based on the category of the current product, excluding the current product itself
        res.render('product_details',{product,relatedProducts,user:getUser(req)});
    }catch(err){
        console.error(err);
        res.status(500).send(' Server error');
    }
});//send the product_details.html file when the /products/:id route is accessed, :id is a placeholder for the product id


module.exports=router; //export the router to be used in server.js like returning something from a module
