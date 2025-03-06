import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import CountryCode from '../../../data/countrycode.json'

const ContactForm = ({heading , description }) => {

    const dispatch = useDispatch()

    const {
         register,
         handleSubmit,
         reset,
         formState:{ errors , isSubmitSuccessful }
    } = useForm()

    useEffect(()=>{
          if(isSubmitSuccessful){
            reset({
                FirstName : "",
                LastName : "",
                EmaiAddress : "",
                message : "",
                ContactNumber : "",
                CountryCode : ""
            })
          }
    } , [reset , isSubmitSuccessful])

    const ActionTaken = (event)=>{

        console.log(event)

        // dispatch()
    }

  return (
    <form onSubmit={handleSubmit(ActionTaken)} className=' border-richblack-400 border p-10 rounded-md'>

         <div className=' flex flex-col '>

           <div className=' flex flex-col text-center'>
           <p className="text-richblack-5 text-[1.5rem] md:text-[1.7rem] font-semibold font-inter leading-[2.5rem] md:leading-[2.75rem]">{heading}</p>
           <p className=" text-richblack-300 font-inter text-[.8rem] ">{description}</p>
           </div>

         <div className=' flex gap-x-3  justify-between mt-8'>

<label>
<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name<sup className="text-pink-200">*</sup></p>
<input
       type='text'
       placeholder='Enter First Name'
       name='FirstName'
       {...register('FirstName' , {
            required:{
                value:true,
                message:"Please Enter Your First Name"
            }
       })}
        className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
    />
    {/* {
      errors.FirstName.message && (
        <div></div>
      )
    } */}
</label>

<label>
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name<sup className="text-pink-200">*</sup></p>
    <input
       type='text'
       placeholder='Enter Last Name'
       name='LastName'
       {...register('LastName' , {
            required:{
                value:true,
                message:"Please Enter Your Last Name "
            }
       })}
       className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
    />
    {/* {
      errors.LastName.message && (
        <div></div>
      )
    } */}
</label>

</div>


<label>
       <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>            
       <input
       type='email'
       placeholder='Enter Email Address'
       name='EmaiAddress'
       {...register('EmaiAddress' , {
            required:{
                value:true,
                message:"Please Enter Your LEmail Address "
            }
       })}
       className='w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
    />
    {/* {
      errors.LastName.message && (
        <div></div>
      )
    } */}
</label>


<label>
     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number<sup className="text-pink-200">*</sup></p>
     <div className=' flex gap-x-3'>
      <select 
           name='CountryCode'
           {...register('CountryCode' , {
               required:{
                value:true,
                message:"Please Provide a country Code"
               }
           })}
           className=' w-[19%] rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}>
        {
           CountryCode.map((Country , index)=>(
            <option key={index}>{Country.code} - {Country.country}</option>
           ))
        }
      </select>
      <input 
        type='tel'
        name='ContactNumber'
        placeholder='Please Enter Your Contact Number'
        {...register('ContactNumber' , {
            required:{
                value:true,
                message:"Please Enter Your Phone Number"
            },
            maxLength:{
                value:10,
                message:"Contact Numbe of 10 Digits"
            },
            minLength:{
                value:10,
                message:"Contact Numbe of 10 Digits"
            }
        })}
        className=' w-[80%] rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
      />
     </div>
    
</label>



<label>
    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message<sup className="text-pink-200">*</sup></p>
    <textarea
        name='message'
        cols={20}
        rows={7}
        placeholder='All Educators are Wonderful'
        // defaultValue=" the Educators is Such a Wonderful  "
        {...register('message'  , {
            required : {
                value: true,
                message : "Please Provide message to Our"
            }
        })}
        className=' w-full rounded-[0.5rem] bg-richblack-800  p-[10px] placeholder-gray-500 text-richblack-5'
        style={{
           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
    />
    {
        
    }
</label>

<button
type="submit"
className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
 >
   Create Account
</button>

         </div>

    </form>
  )
}

export default ContactForm