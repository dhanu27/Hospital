const User=require('../models/user');
const jwt=require('jsonwebtoken');
const { use } = require('../config/passport-jwt');

const toObject=function(Object ,ret){
  delete ret.password
}
// function to register a Doctor
module.exports.registerDoctor=async function(req,res){
      try{
          // Check doctor already registred or not 
          let user=await User.findOne({ $or: [{username:req.body.username},{phone:req.body.phone}]});
           if(user){
            //  check if doctor exist or sameusername doctor exist 
               if(user.phone==req.body.phone){
                 return res.status('200').json({
                   meassage:"User already exist"
                 });
                }
              //  Doctor entering the same username  
                 else{
                  return res.status('200').json({
                    meassage:"change username this is used other "
                  });
                 }
            } 
         // register the new doctor     
        else{  
          
          req.body.profession='Doctor'
          user=await User.create(req.body);
          console.log(user.toObject());
          return res.status('200').json({
            meassage:"sucessfully Registered a Doctor",
            data:user.toObject()
          });
        }  
      }catch(err){
        console.log("Error in register doctor",err);
        return res.status('500').json({
          message:"Internal Server Error"
      });
      }    
}

// Login the doctor
module.exports.login=async function(req,res){
    try{
      // If doctor exist or not
        let user=await User.findOne({phone:req.body.phone});
        if(!user||user.password!=req.body.password){
          res.status(422).json({
                  message:"Invalid phoneno./password"
          }); 
        }
        // doctor is authenticate return API  token . 
       else{
           res.status(200).json({
               data:{
                   token:jwt.sign(user.toJSON(),"Hospital",{expiresIn:'1h'})
               }
           })
       } 
    }catch(err){
       console.log("#####Error######",err);
       res.status(500).json({
           message:"Internal Server Error"
       })
    }
}

// Register the patient 
module.exports.registerPaitent=async function(req,res){
 try{ 
    
    //  check if patient already registerd or not
      let patient=await User.findOne({phone:req.body.phone});
      
      // If already exist return details of patient
      if(patient){
        return res.status(200).json({
          mesaage:"Already exist",
          data:{
            patient:patient
          }
        });
      }
      // If not register the patient
      else{
        patient=await User.create({
          phone:req.body.phone,
          username:req.body.username,
          profession:"Patient"
        });
        return res.status(200).json({
          mesaage:"Sucessfully register a patient",
          data:{
            patient:patient
          }
        });
      }
    }catch(err){
      console.log("Error in Register patient",err);
     return res.status(504).json({
        message:"Internal server error",
      });

    }
}


