const mongoose=require('mongoose');


const reportSchema=new mongoose.Schema({
    
    pateint_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        required:true,
        enum: ["Negative", "Travelled-Quarantine",
            "Symptoms-Quarantine", "Positive-Admit"]
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true}
 );
 reportSchema.options.toObject={};
 reportSchema.options.toObject.transform =function(doc,ret,options){
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
 return ret;   
}
const report= mongoose.model('report',reportSchema);
module.exports=report;