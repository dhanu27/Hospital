const express=require('express');
const router=express.Router();
const passwortJWT=require('../config/passport-jwt');
const user=require('../controller/user_controller');
router.post('/register',user.registerDoctor);
router.post('/login',user.login);
module.exports=router;