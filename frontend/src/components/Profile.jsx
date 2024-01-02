import React, { useState } from "react";
import Logo from "../assets/plogo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from "./PostCard";
import cookies from 'js-cookie'

const Profile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [postText, setPostText] = useState('');
  //  ------------------------- Handle Log Out -----------------------

  const HandleLogout = async () => {
    console.log("Logout successful!");
        localStorage.clear();
        sessionStorage.clear()
        cookies.remove("userData");
        
        navigate("/login");
   
  };

let id = "6583e3cd9d8ccbc31a187c94"
  //  ------------------------- Handle File Upload -----------------------
  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("postText", postText);

      const response = await fetch("http://localhost:4000/post/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File upload successful!");
        toast.success("File uploaded");
        setShowModal(false); 
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file upload:", error.message);
    }
  };


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className=" mx-auto">
      <div className="seminavbar border-b w-full flex justify-between items-center  bg-zinc-50 px-4">
        <div className="fileUploader w-3/4 border-r-2 mr-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-2"
          >
            Upload Post
          </button>
        </div>

        <div className="btnbox flex justify-between items-center w-1/4 mx-auto">
          <div className="mini flex justify-center items-center">
            <img
              src="https://imgs.search.brave.com/1y9Ub9o6yl001soCkIsgBndRX2QoeVOxS3H47OXGw5w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudGhlbm91bnBy/b2plY3QuY29tL3Bu/Zy83NzA3OTctMjAw/LnBuZw"
              alt="user profile"
              className="w-14 h-10 rounded-full px-2"
            />
            <h1 className="mx-2"> Akhilesh</h1>{" "}
          </div>

          <button
            onClick={HandleLogout}
            className="bg-red-600 border-l text-white  hover:bg-red-700 px-4 py-2 rounded-full my-4"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="profilebox flex justify-center items-center">
        {/* ================ Modal ====================== */}
        {showModal ? (
          <>
            <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-0 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-end text-black ">
                    <p
                      onClick={() => setShowModal(false)}
                      className=" mr-2 text-4xl hover:cursor-pointer"
                    >
                      ×
                    </p>
                  </div>
                  {/*body*/}
                  <div className="relative py-2 px-6 flex-auto">
                    <form
                      // onSubmit={handleFileUpload}
                      encType="multipart/form-data"
                    >
                      <div className="my-2">
                        <input
                          type="text"
                          name="postText"
                          onChange={(e) => setPostText(e.target.value)}

                          className="my-2 p-2 text-lg  border-2"
                          placeholder="Enter some text "
                        />
                      </div>
                      <div className="my-2">
                        <input
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                    <button
                      type="submit " onClick={handleFileUpload}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-2"
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {/* ====================================== */}
        <PostCard />
      </div>
      <ToastContainer />
    </div>
  );
};




export default Profile;
