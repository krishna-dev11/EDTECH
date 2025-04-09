import toast from "react-hot-toast"
import {setLoading, settoken} from  '../../Slices/Auth'
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import { setUser } from "../../Slices/Profile"



const {
    SENDOTP_API ,
    SIGNUP_API ,
    LOGIN_API,
    RESETPASSTOKEN_API ,
    RESETPASSWORD_API
} = endpoints



export function  sendOtp(email , navigate){

    return async (dispatch)=>{

        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        
        try{
            const response = await apiConnector("POST" , SENDOTP_API , {
                email:email ,
                checkUserPresent : true
            } )
           
            if (!response) {
                throw new Error(response.data.message)
              }

            toast.success("OTP SENDED")
            navigate("/enterOtp")
        }catch(error){
            console.log("error in sending OTP")
            console.log(error)
            toast.error("OTP Can't send")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

export function signUp(firstName , lastName, email , password, confirmPassword, accountType, otp , navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        
        try{

            const response = await apiConnector("POST" , SIGNUP_API , {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            })

            // console.log("hiiiiiibyeeee" , firstName , lastName, email , password, confirmPassword, accountType , otp)

           if (!response.data || !response.data.success) {
               throw new Error(response.data?.message || "Unknown error occurred");
            }

            toast.success("SignUp Successful")
            navigate('/login')

        }catch(error){

            console.log(error)
            console.log("eror in SignUp")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function setLogin(email , password , navigate){
    return async (dispatch)=>{
        
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{

            const response = await apiConnector("POST" , LOGIN_API , {
                email, 
                password
            })
            // console.log(response)
            // console.log(response.data)
            // console.log(response.data.User)
            // console.log(response.data.token)


            dispatch(settoken(response.data.token))
            localStorage.setItem("token" , JSON.stringify(response.data.token))

            dispatch(setUser(response.data.User))
            localStorage.setItem("user" , JSON.stringify(response.data.User))

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login")
            navigate("/")

        }catch(error){
             console.log(error)
             console.log("error in Login")
             toast.error("login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
}

export function setLogOut(navigate){
    return async (dispatch)=>{
        
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{

            dispatch(setUser(null))
            localStorage.clear("token")

            dispatch(settoken(null))
            localStorage.clear("user")

            toast.success("LogOut")

            window.location.reload()
            


            navigate("/login")

        }catch(error){
             console.log(error)
             console.log("error in LogOut")
             toast.error("logOut failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
}

export function sendTokenLink(email , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch( setLoading(true))
        try{

            const response = await apiConnector("POST" , RESETPASSTOKEN_API , {
                email
            } )

            if(!response){
                navigate("/resendToken")
            }

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Check Email")

        }catch(error){
           console.log("unable to send Token Email")
           console.log(error)   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function forgotPassword( password , confirmedPassword , token , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch( setLoading(true))
        try{

            const response = await apiConnector("POST" , RESETPASSWORD_API , {
                password ,
                confirmedPassword,
                token
            } )


            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Update successfully")
            navigate("/resetCompletePage")


        }catch(error){
           console.log("unable to update password")
           console.log(error)   
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}