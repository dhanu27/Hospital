const express=require('express');
const router=express.Router();

const report_controller=require('../controller/report_controller');
const report = require('../models/report');
router.get('/:status',report_controller.reportsBystatus);

module.exports=router;