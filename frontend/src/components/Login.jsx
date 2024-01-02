import React, { useState } from "react";
import Logo from "../assets/plogo.svg";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.json();
        const userObject = {
          token: data.token,
          userId: data.userId,
        };
        localStorage.setItem('userData', JSON.stringify(userObject));
        sessionStorage.setItem('token', data.token);
        const expires = new Date();
        expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds
        // document.cookie = `userData=${JSON.stringify(userObject)};expires=${expires.toUTCString()};path=/`;
        document.cookie = `token=${JSON.stringify(userObject.token)};expires=${expires.toUTCString()};path=/`;
        console.log('Login successful!', data);
        setLoading(false);
        navigate('/profile');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleInputText = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className="formSection md:w-[36vw] w-11/12 bg-zinc-50 shadow-lg mt-2 rounded-3xl p-8">
        <div className="logobox flex justify-center my-3">
          <img src={Logo} alt="pintrestLogo" className="w-10 h-10" />
        </div>
        <h1 className="text-center my-1 text-3xl font-semibold">
          Welcome to Pinterest
        </h1>
        <form className="form flex md:w-3/4 sm:h-4/5 w-11/12 flex-col mx-auto justify-center items-center py-2">
          <div>
            <div className=" mb-1">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Email"
                onChange={handleInputText}
              />
            </div>
            <div className=" mb-1">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Password"
                onChange={handleInputText}
              />
            </div>
            <div className="float-left mb-4">
              <Link
                to={"/forgotPassword"}
                className="text-sm font-semibold hover:underline"
              >
                Forgotten your password
              </Link>
            </div>

            <button
              onClick={handleLogin}
              type="submit"
              className="bg-red-600 hover:bg-red-700 w-full my-2 px-8 py-2 rounded-full text-white"
            >
             {loading ? "Loading..." :"Log in"} 
            </button>

            <p className="text-gray-700 font-semibold text-center my-2">Or</p>

            <div className="flex items-center my-2 bg-blue-600 w-full px-2 py-2 rounded-full text-white">
              <div className="mr-2">
                <BsFacebook className="text-white text-lg" />
              </div>
              <p>Log in with facebook</p>
            </div>
            <div className="flex items-center my-2 border w-full px-2   py-2 rounded-full ">
              <div className="mr-2">
                <FcGoogle className="text-white text-lg" />
              </div>
              <p>Log in with Google</p>
            </div>

            <p className="text-gray-500 text-xs text-center mt-4">
              By continuing, you agree to Pinterest's Terms of Service
            </p>

            <h5 className="text-sm font-semibold text-center text-gray-700 mt-2">
              Not on Pinterest yet?{" "}
              <Link to={"/signup"} className="hover:underline">
                Sign up
              </Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
