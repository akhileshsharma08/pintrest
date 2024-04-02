import React, { useEffect, useState } from "react";

import defaultImage from "../assets/plogo.svg";
import { Link } from "react-router-dom";

const Explore = () => {
  const [allfeeds, setAllFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/post/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllFeeds(data.allpost);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during data fetching:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(allfeeds);
  return (
    <div className="container flex justify-start flex-wrap mx-auto my-2">
      {allfeeds.map((item) => (
        <Link to={`/post/${item._id}`} key={item._id}>
        <div
          
          className="card w-60 h-full p-2 rounded m-2 bg-zinc-50 hover:shadow-lg shadow-md text-black"
        >
          <div className="cardBody">
            <img
              src={item.postImage ? `/uploads/${item.postImage}` : defaultImage}
              alt="sample image"
              className="w-full object-cover my-2 rounded"
            />
            <h1 className="capitalize text-center my-1">{!item.postTitle ? "Title":item.postTitle}</h1>
          </div>
        </div>
        </Link>
        
      ))}
    </div>
  );
};

export default Explore;
