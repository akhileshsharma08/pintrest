import React from "react";

const YellowSection = () => {
  return (
    <div className="bg-yellow-200 h-[85vh] flex items-center">
      <div className="container flex md:flex-row flex-col justify-center items-center">
        <div className="md:w-1/2 w-full mx-auto px-2">bbvbnvnb</div>
        <div className="md:w-1/2 w-full mx-auto px-8 text-pink-700 ">
          <h1 className="text-6xl  font-bold my-6 ">Search for an idea</h1>
          <p className="text-xl px-10 font-semibold">
            What do you want to try next? Think of something you’re into – such
            as 'easy chicken dinner' – and see what you find.
          </p>
          <div className="mx-auto flex justify-center"><button className="text-white text-lg  bg-pink-700 px-3 my-6 rounded-full py-2 ">
            Explore
          </button></div>
          
        </div>
      </div>
    </div>
  );
};

export default YellowSection;
