const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const TechnicianSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

TechnicianSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('Technician',TechnicianSchema);