import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from "./PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [userPost, setUserPost] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userData");
        const response = await fetch("http://localhost:4000/post/user_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.userPosts, "data");
          setUserPost(data.userPosts);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during data fetching:", error.message);
      }
    };

    if (fetchDataTrigger) {
      fetchData();
      setFetchDataTrigger(false);
    }
    console.log(userPost, "userPost");
  }, [fetchDataTrigger, setUserPost]);
  // --------------------------------------
  useEffect(() => {
    handleProfileChange();
  }, [profile]);
  // ----------------------------------------
  const handleProfileChange = async () => {
    const userId = JSON.parse(localStorage.getItem("userData")).userId;
    console.log(userId, "profile");
    if (!profile) {
      console.log("no profile uploaded");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profileImage", profile);
      formData.append("userId", userId);

      const response = await fetch("http://localhost:4000/user/profileUpload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Profile image uploaded");
        setShowModal(false);
        setFetchDataTrigger(true);
      } else {
        console.error("Profile image upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during profile image upload:", error.message);
    }
  };
  // -------------------------------------------
  const handleFileUpload = async (e) => {
    const userId = JSON.parse(localStorage.getItem("userData")).userId;
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("postTitle", postTitle);
      formData.append("postText", postText);
      formData.append("userId", userId);

      const response = await fetch("http://localhost:4000/post/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File upload successful!");
        toast.success("File uploaded");
        setShowModal(false);
        setFetchDataTrigger(true);
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during file upload:", error.message);
    }
  };
  // -------------------------------------
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  // -------------------------------------------
  const handleProfileImageChange = (event) => {
    console.log("profile image", event.target.files[0]);
    setProfile(event.target.files[0]);
  };

  return (
    <div className=" mx-auto">
      <div className="seminavbar border-b w-full flex justify-center items-center text-slate-800 bg-zinc-50 px-4">
        <div className="userBox mx-auto py-4 text-center">
          <div className="userProfile flex justify-center">
            <div className="flex w-32 h-32 bg-zinc-200 p-1 rounded-full justify-center items-center my-2 mx-auto">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                name="file"
                id="fileInput"
                onChange={handleProfileImageChange}
              />
              <label
                htmlFor="fileInput"
                className="text-6xl myimg p-6 text-center rounded-full font-semibold cursor-pointer"
              >
                A
              </label>
            </div>
          </div>
          <h1 className="text-3xl mt-2 font-semibold">Akhilesh</h1>
          <p className="text-slate-600">Akhilesh@gmail.com</p>
          <p>0 Following</p>
          <div className="fileUploader flex justify-center gap-2 font-semibold mt-2 mx-auto">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-2"
            >
              Create Pin
            </button>
            <h1 className="px-4 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300">
              Share
            </h1>
            <h1 className="px-4 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300">
              Edit Profile
            </h1>
          </div>
        </div>
      </div>
      <div className="profilebox flex justify-center items-center">
        {/* ================ Modal ====================== */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                    <form encType="multipart/form-data">
                      <div className="my-2">
                        <input
                          type="text"
                          name="postTitle"
                          onChange={(e) => setPostTitle(e.target.value)}
                          className="my-2 p-2 text-lg border-2"
                          placeholder="Enter Title "
                        />
                      </div>
                      <div className="my-2">
                        <input
                          type="text"
                          name="postText"
                          onChange={(e) => setPostText(e.target.value)}
                          className="my-2 p-2 text-lg border-2"
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
                      type="submit"
                      onClick={handleFileUpload}
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
        <div className="container">
          {userPost.length > 0 ? (
            <div className="flex flex-wrap">
              {userPost.map((item) => (
                <PostCard item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <p className="text-4xl font-semibold text-center mt-8">
              No pins found.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
