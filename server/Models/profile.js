const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender:{   
        type:String,   
       
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
    }

},
{timestamps : true});

module.exports = mongoose.model("profile" , profileSchema);