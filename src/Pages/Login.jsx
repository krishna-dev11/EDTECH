import React from 'react'
import loginImg  from "../assets/Images/login.webp"
import Template from '../Components/Core/Auth/Template'

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond. "
      desc2="Education to future-proof your career..."
      image={loginImg}
      formtype="login"
    />
  )
}

export default Login