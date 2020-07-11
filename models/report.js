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
},{timestamps:true});

const report= mongoose.model('report',reportSchema);
module.exports=report;