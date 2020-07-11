const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const passport=require('passport');
const passportJwt=require('./config/passport-jwt');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('body-parser');

app.use(urlencoded());
app.use(cookieParser());
app.use('/',require('./router'));
app.listen(port,(err)=>{
    if(err){
        console.log("Error while listen app",err);
        return;
    }
   console.log(`App running on localhost port no ${port}`);
});
