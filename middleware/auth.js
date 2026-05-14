const jwt=require('jsonwebtoken');
//middleware: In Express, middleware is a function that runs between the request coming in and your route handler running. next() means "okay, move on to the next step." You've seen this pattern — app.use(express.static(...)) is also middleware.
const SECRET='shophub_secret_key_2026';

module.exports=(req,res,next) => {
    const token =req.cookies.token;
    if (!token){
        return res.redirect('/login');

    }
    try {
        const decoded =jwt.verify(token,SECRET);
        req.user=decoded;
        next();
    }catch (err){
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
