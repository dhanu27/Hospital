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
},{timestamps:true});

const user=mongoose.model('user',userSchema);
module.exports=user;
