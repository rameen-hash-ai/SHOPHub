const express =require('express'); //importing the express module
const mongoose=require('mongoose'); //importing the mongoose module
const path=require('path');
const cookieParser=require('cookie-parser')
const app=express();

app.set('view engine', 'ejs');//setting the view engine to ejs, which allows us to render dynamic HTML pages using EJS templates
app.set('views', path.join(__dirname, 'views'));//by defualt it looks for a views folder
app.use(express.static('public'))//static files
app.use(express.urlencoded({extended:true})); //to parse form data
app.use(cookieParser()); //enabling reading cookies

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() =>console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
// const express=require('express'); //importing same as "from fastapi import FASTAPI"

// const app=express(); //creating an instance of express
// app.use(express.static('public')); // tell express where our static files live (css,js)

const pageRoutes=require('./routes/pages'); //importing the page routes 
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin');

app.use('/',pageRoutes); //tell express to use those routes
app.use('/',authRoutes);
app.use('/',adminRoutes);

const PORT=3000; //defining the port number
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`); //starting the server and logging a message to the console
});