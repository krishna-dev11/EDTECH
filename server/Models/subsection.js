const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({

     title:{    
        type:String,
        required:true,
       
     },
     timeDuration:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true,
       
     },
     videoUrl:{
        type:String
     },

},
{timestamps : true});

module.exports = mongoose.model("subSection" , subSectionSchema);