import React from "react";

const GreenSection = () => {
  return (
    <div className="bg-green-100 h-[80vh] text-center text-teal-700 flex items-center">
      <div className="flex md:flex-row flex-col justify-center items-center">
        <div className="md:w-1/2 w-full mx-auto px-8 ">
          <h1 className="text-6xl font-bold my-6 ">Search for an idea</h1>
          <p className="text-xl px-10 font-semibold">
            What do you want to try next? Think of something you’re into – such
            as 'easy chicken dinner' – and see what you find.
          </p>
          <button className="text-white text-lg bg-teal-700 px-3 my-6 rounded-full py-2 ">
            Explore
          </button>
        </div>
        <div className="md:w-1/2 w-full">
        <h1 className="md:text-6xl text-4xl font-bold my-6 ">Shgk hh gh gjh </h1>
          
        </div>
      </div>
    </div>
  );
};

export default GreenSection;
