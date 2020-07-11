const User=require('../models/user');
const Report=require('../models/report');
const report = require('../models/report');

// Create a report 
module.exports.createReport=async function(req,res){
    try{     
        console.log(req.params.id);
        let report= await Report.create({
            pateint_id:req.params.id,
            status:req.body.status,
            doctor_id:req.user.id
        });
        return res.status(200).json({
            message:"Report Made Succesffuly",
            report:report
        });
    }catch(err){
        console.log("Error in creating Rport",err);
        return res.status(540).json({
             message:"Internal Server Error"
        })   
    }
}

// Report of a particular patient by id
module.exports.pateintReports=async function(req,res){
    try{
        
        let reports=await Report.find({pateint_id:req.params.id}).populate('pateint_id','username phone')
                                                                   .populate('doctor_id','username phonenumber');
        console.log(reports);
        res.status(200).json({
            message:"Success",
            data:{
                report:reports
            }
        });
    }catch(err){
        console.log("Error in getting patient Report",err);
        res.status(540).json({
            message:"Internal Server Error"
        });
    }
}

// Getting report by Status
module.exports.reportsBystatus=async function(req,res){
    try{
        
        let reports =await Report.find({status:req.params.status}).populate('pateint_id','username phone')
                                                                   .populate('doctor_id','username phonenumber');
       console.log(reports);
       res.status(200).json({
            message:"Success",
                   data:{
                    report:reports
                   }
               });                                                          

    }catch(err){
        console.log("Error in getting Reports status wise",err);
        res.status(540).json({
            message:"Internal Server Error"
        });
    }
       
}

