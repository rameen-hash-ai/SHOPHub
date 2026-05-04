const express=require('express'); //importing same as "from fastapi import FASTAPI"

const app=express(); //creating an instance of express
app.use(express.static('public')); // tell express where our static files live (css,js)

const pageRoutes=require('./routes/pages'); //importing the page routes 

app.use('/',pageRoutes); //tell express to use those routes

const PORT=3000; //defining the port number
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`); //starting the server and logging a message to the console
});