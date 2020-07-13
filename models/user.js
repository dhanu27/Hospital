const mongoose=require('mongoose');
const { min } = require('lodash');

const userSchema=new mongoose.Schema({
    username:{
       type:String,
       required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
    },
    profession:{
        type:String
    }
},{timestamps:true}
 );
userSchema.options.toObject={};
userSchema.options.toObject.transform =function(doc,ret,options){
          delete ret.password;
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
       return ret;   
}
const user=mongoose.model('user',userSchema);
module.exports=user;
