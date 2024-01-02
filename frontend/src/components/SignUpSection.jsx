import React from 'react'
import Register from './Register'
const SignUpSection = () => {
  return (
    <div className="bg-blue-400  text-center  flex items-center">
      <div className="flex md:flex-row flex-col items-center pb-4">
        <div className="md:w-1/2 w-fullmx-auto px-8 ">
          <h1 className="md:text-8xl text-5xl font-bold my-6 text-white">Sign up to get your ideas</h1>
          
          
        </div>
        <div className="md:w-1/2 w-full text-left ">
        <Register />
          
        </div>
      </div>
    </div>
  )
}

export default SignUpSection