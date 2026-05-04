//import xpress and create a router
//router is like a mini-app that handles a group of routes

const express = require('express');
const router =express.Router();
const path =require('path'); //importing path module to work with file paths
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html')); //send the index.html file when the root route is accessed
});
router.get('/products',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/products.html'));
});//send the products.html file when the /products route is accessed

router.get('/products/:id',(req,res)=>{
    console.log('Product requested:',req.params.id); //log the product id to the console
    res.sendFile(path.join(__dirname,'../views/product_details.html')); //send the product.html file when a specific product is requested
});

module.exports=router; //export the router to be used in server.js like returning something from a module
