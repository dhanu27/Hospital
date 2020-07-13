const express=require('express');
const router=express.Router();
const passwortJWT=require('../config/passport-jwt');
const passport = require('passport');

const user=require('../controller/user_controller');
const report=require('../controller/report_controller');

router.post('/register',user.registerPaitent);
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),report.createReport);

router.get('/:id/all_reports',report.pateintReports);

module.exports=router;