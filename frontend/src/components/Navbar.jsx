import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/plogo.svg";

const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);

  const navlinks = [
    {
      labe: "Today",
      link: "#",
    },
    {
      labe: "Watch",
      link: "#",
    },
    {
      labe: "Explore",
      link: "#",
    },
    {
      labe: "About",
      link: "#",
    },
    {
      labe: "Business",
      link: "#",
    },
    {
      labe: "Press",
      link: "#",
    },
  ];
  return (
    <>
      <main>
        <nav className="flex justify-between px-8 items-center py-6  z-1 ">
          <div className="flex items-center gap-8 navlink-wrapper">
            <section className="flex items-center gap-4">
              <FiMenu
                onClick={() => setMenu(true)}
                className="text-3xl cursor-pointer lg:hidden"
              />
              {/* logo */}
              <Link href={"/"} className=" ">
                 <div className="flex justify-center items-center">
                 
                  
                  
                  <img src={logo} alt="pintrest logo" className="w-10 h-10" />
                  <h1 className="text-red-600 text-3xl font-bold mx-2">
                    Pintrest
                  </h1>
                </div>
              </Link>
            </section>
            {navlinks.map((d, i) => (
              <Link
                key={i}
                className="hidden lg:block  text-black hover:bg-gray-200 p-1 rounded font-semibold"
                href={d.link}
              >
                {d.labe}
              </Link>
            ))}

            <ul className="hidden md:flex float-right justify-end items-center gap-1 ulRight">
              <Link to={"/login"}>
                <li className="font-semibold bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                  Log in
                </li>
              </Link>
              <Link to={"/signup"}>
                <li className="font-semibold bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                  Sign up
                </li>
              </Link>
            </ul>
          </div>

       {/* ================= Mobile menu=================== */}
       <div
            className={`
              fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0
              ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}
              transition-all
            `}
          >
            <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8  w-56 flex">
              <IoCloseOutline
                onClick={() => setMenu(false)}
                className="mt-0 mb-8 text-3xl cursor-pointer"
              />

              {navlinks.map((d, i) => (
                <Link key={i} className="font-bold" to={d.link}>
                  {d.labe}
                </Link>
              ))}

              {/* Login and Signup buttons in mobile menu */}
              <div className="flex flex-col gap-4">
                <Link to={"/login"}>
                  <button className="font-semibold bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                    Log in
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="font-semibold bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                    Sign up
                  </button>
                </Link>
              </div>
            </section>
          </div>

          {/* last section */}
          <section className="flex items-center gap-4">
            {/* Additional elements (e.g., shopping cart) */}
          </section>
        </nav>
        <hr className=" " />
      </main>
    </>
  );
};

export default Navbar;
