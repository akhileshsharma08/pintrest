import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/plogo.svg";

const Navbar = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const navlinks = [
    { label: "Today", link: "today" },
    { label: "Watch", link: "#" },
    { label: "Explore", link: "explore" },
    { label: "About", link: "#" },
    { label: "Business", link: "#" },
    { label: "Press", link: "#" },
  ];

  const isProfilePage = location.pathname.includes("/profile");
 //  ------------------------- Handle Log Out -----------------------

 const HandleLogout = async () => {
  console.log("Logout successful!");
  localStorage.clear();
  sessionStorage.clear();
  await cookies.remove("token");
  setTimeout(()=>{
    navigate("/login", { replace: true });
  },1000)
};

  return (
    <main>
      <nav className="flex justify-between px-8 items-center py-4 z-1">
        <div className="flex items-center gap-8 navlink-wrapper">
          <section className="flex items-center gap-4">
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            <Link to={"/"} className="">
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
              className="hidden lg:block text-black hover:bg-gray-200 p-1 rounded font-semibold"
              to={`/${d.link}`}
            >
              {d.label}
            </Link>
          ))}
          <ul className="hidden md:flex float-right justify-end items-center gap-1 ulRight">
            {!isProfilePage ? (
              <>
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
              </>
            ):(<><Link to={"/profile"}
              className="bg-zinc-200 border-l   hover:bg-zinc-300 px-4 py-2 rounded-full "
            >
              Profile
            </Link> <button onClick={HandleLogout}
              className="bg-red-600 border-l text-white  hover:bg-red-700 px-4 py-2 rounded-full "
            >
              Log out
            </button></>)}
          </ul>
        </div>
        <div
          className={`
            fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0
            ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}
            transition-all
          `}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 w-56 flex">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />
            {navlinks.map((d, i) => (
              <Link key={i} className="font-bold" to={d.link}>
                {d.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4">
            {!isProfilePage ? (
              <>
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
              </>
            ):(<><Link to={"/profile"}
              className="bg-zinc-200 border-l text-center  hover:bg-zinc-300 px-4 py-2 rounded-full "
            >
              Profile
            </Link> <button onClick={HandleLogout}
              className="bg-red-600 border-l text-white  hover:bg-red-700 px-4 py-2 rounded-full "
            >
              Log out
            </button></>)}
            </div>
          </section>
        </div>
      </nav>
      <hr />
    </main>
  );
};

export default Navbar;
