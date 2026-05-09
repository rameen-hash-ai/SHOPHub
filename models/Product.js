const mongoose=require('mongoose'); //importing the mongoose module
const productSchema=new mongoose.Schema({ //defining the schema for the product model
    name:{
        type:String,
        required:true
    
    },
    price: {
        type:Number,
        required:true
    },
    originalPrice: {
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    brand:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:Number,
        default:0
    },
    imageUrl:{
        type:String,
        default:'https://via.placeholder.com/300x300?text=No+Image'
    },
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    }
});

//create the model from the schema
//collection is like a table

const Product=mongoose.model('Product',productSchema); //creating the model from the schema, 'Product' is the name of the collection in MongoDB
module.exports=Product; //exporting the model so it can be used in other files
