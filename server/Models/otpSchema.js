const mongoose = require("mongoose");
const emailTemplate = require("../mail/templates/emailVerificationEmail")
const {mailSender} = require("../Utilities/mailSender")

const otpSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true
     },
     otp:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now(),
        expires: 60 * 5
     }

},
{timestamps : true})



const sendVerificationEmail = async(email , otp)=>{
    try{
       await mailSender(email , `Verification mail` , emailTemplate(otp));
    }catch(error){
       console.error(error);
    }
}

otpSchema.pre("save" , async function(next){
    try{

        await sendVerificationEmail(this.email , this.otp)
        next()

    } catch(error){
        console.log("error in sending the email by function call")
    }

   // if(this.isNew){
   //    await sendVerificationEmail(this.email , this.otp)
      
   //      next()
   // }
})


module.exports = mongoose.model("OTP" , otpSchema);
