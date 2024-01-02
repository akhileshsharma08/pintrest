import React, { useState } from "react";
import Logo from "../assets/plogo.svg";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [registerData, setRegisterData] = useState({
    username:"",
    email: "",
    password: "",
    dob:""
  });
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        console.log("register successful!");
        navigate('/login')
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  console.log(registerData,"reg")
  const handleInputText = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container mx-auto  flex justify-center items-center">
        <div className="formSection md:w-[36vw] w-11/12 bg-zinc-50 shadow-lg mt-3 rounded-3xl ">
          <div className="logobox flex justify-center my-3">
            <img src={Logo} alt="pintrestLogo" className="w-10 h-10" />
          </div>
          <h1 className="text-center my-2 text-3xl font-semibold">
            Welcome to Pintrest
          </h1>
          <div className="form flex justify-center items-center py-4">
            <div className="test md:w-1/2 w-3/4">
            <div className="relative mb-1">
                <label for="email" className="leading-7 text-sm text-gray-600">
                 User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="User Name"
                  onChange={handleInputText}
                />
              </div>
              <div className="relative mb-1">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  id="Email Address"
                  name="email"
                  className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Email address"
                  onChange={handleInputText}
                />
              </div>
              <div className="relative mb-1">
                <label
                  for="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Create Password"
                  onChange={handleInputText}
                />
              </div>
              <div className="relative mb-1">
                <label
                  for="dob"
                  className="leading-7 text-sm text-gray-600"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  id="date"
                  name="dob"
                  className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="dob"
                  onChange={handleInputText}
                />
              </div>
         
              <button
                type="submit"
                onClick={handleSignup}
                className="bg-red-600 hover:bg-red-700 w-full my-2 px-8 py-2 rounded-full text-white"
              >
                Sign up
              </button>
              <p className="text-center text-gray-700 font-semibold my-2">Or</p>
              <div className="flex items-center my-2 bg-blue-600 w-full px-2 py-2 rounded-full text-white">
                <div className="mr-2">
                  <BsFacebook className="text-white text-lg" />
                </div>
                <p>Sign up with facebook</p>
              </div>
              <div className="flex items-center my-2 border w-full px-2   py-2 rounded-full ">
                <div className="mr-2">
                  <FcGoogle className="text-white text-lg" />
                </div>
                <p>Sign up with Google</p>
              </div>

              <p className="text-gray-500 text-xs text-center">
                By continuing, you agree to Pinterest's Terms of Service
              </p>
              <h5 className="text-sm font-semibold text-center text-gray-700 ">
                Already member? <Link to={"/login"}><span className="hover:underline">Log in</span></Link>  
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register