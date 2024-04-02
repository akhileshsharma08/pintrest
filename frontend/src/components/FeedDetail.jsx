import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShareAltSquare } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaGrinHearts } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

const FeedDetail = () => {
  const [singlePost, setSinglePost] = useState({
    _id: "",
    postTitle: "",
    postText: "",
    postImage: "",
    // Add other properties if needed
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSinglePost(data.getpost);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during data fetching:", error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="main bg-zinc-100">
        <div className="container w-3/4 mx-auto py-2 ">
      <div
        key={singlePost._id}
        className="cardbox md:flex-row flex-col flex justify-center border rounded-[30px] shadow-3xl bg-white text-gray-800"
      >
        <div className="md:w-1/2 w-full">
          <img
            src={`/uploads/${singlePost.postImage}`}
            alt={singlePost.postTitle}
            className="rounded-[20px] w-full object-cover p-4"
          />
        </div>
        <div className="md:w-1/2 w-full p-2">
          <div className="description my-2">
            <div className="utilitybox flex justify-between items-center mb-2">
              <div className="box1 flex justify-start gap-2 text-3xl">
                <h1 className="p-2 rounded-full hover:bg-zinc-200">
                  <FaShareAltSquare />
                </h1>
                <h1 className="p-2 rounded-full hover:bg-zinc-200">
                  <MdMoreHoriz />
                </h1>
              </div>
              <button className="bg-red-600 hover:bg-red-700 px-6 text-lg py-1 rounded-full text-white">
                save
              </button>
            </div>
            <div className="userbox flex justify-between  items-center gap-2 text-3xl mb-2">
              <div className="flex justify-center items-center">
                <h1>
                  <FaUserCircle />
                </h1>
                <h1>username</h1>
              </div>
              <button className="bg-zinc-100 hover:bg-zinc-200 px-4 py-2 text-lg rounded-full">
                Follow
              </button>
            </div>
            <h1 className="text-4xl font-semibold capitalize my-2">
              {singlePost.postTitle}
            </h1>
            <p className="text-lg">{singlePost.postText}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              assumenda et, laborum blanditiis possimus obcaecati soluta ut quia
              ducimus, praesentium alias dignissimos debitis harum perferendis
              distinctio! Pariatur eum ea molestias.
            </p>
            <div className="commentbox">
              <h1 className="font-semibold my-2">Comments</h1>
              <div className="flex justify-start items-center gap-1">
                <h1>
                  <FaUserCircle />
                </h1>
                <h1 className="my-1">username</h1>
              </div>
              <p>this is sample comment</p>
            </div>
            <div className="reactionbox font-semibold flex justify-between my-1 items-center text-lg">
              <h1>What do you think?</h1>
              <div className="iconbox flex justify-end items-center">
                <div className="flex items-center">
                  <h1 className="flex items-center">
                    <FaGrinHearts className="mr-1" />
                    {Math.floor(Math.random() * 20)}
                  </h1>
                </div>
                <h1 className="ml-2 p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 font-bold">
                  <FaRegHeart />
                </h1>
              </div>
            </div>
              <div className="iconwithsearchbox flex justify-start items-center">
                <div className="flex items-center">
                  <h1 className="flex items-center text-3xl">
                    <FaUserCircle className="mr-1" />
                  </h1>
                </div>
                <div className="flex items-center flex-grow">
                  {" "}
                  <input
                    type="text"
                    className="bg-zinc-200 w-full rounded-full border px-2 text-xl py-2"
                    placeholder="Add a comment"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default FeedDetail;
