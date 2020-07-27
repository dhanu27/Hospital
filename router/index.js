const express=require('express');
const router=express.Router();

const user=require('../controller/user_controller');
router.use('/doctors',require('./doctors'));
router.use('/patients',require('./patients'));
router.use('/reports',require('./reports'));
module.exports=router;

