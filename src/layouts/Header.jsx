import React, { useEffect, useState } from "react";
import logo from "../assets/FreeInvoiceGenerator.png";
import avatar from "../assets/boy.png";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function Header() {
  const { user, logOut } = useAuth();

  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [profileImg, setProfileImg] = useState(avatar);
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    setProfileImg(savedUser?.profile || avatar);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [open, setOpen] = useState(false);
  //   stop overflow
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="shadow-md">
      <header className="container   flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img className="w-8" src={logo} alt="Free Invoice Generator" />
            <span className="font-semibold text-xl text-primary ">
              Free Invoice Generator
            </span>
          </div>
        </Link>
        <div className="hidden items-center justify-between gap-2.5 md:flex">
          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
          </button>
          <div>
            {user ? (
              <div className="flex items-center gap-5">
                <Link to="/dashbord">
                  <img className="w-10" src={profileImg} alt="Profile" />
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                  className="px-5 py-2.5 cursor-pointer rounded-sm text-white bg-accent hover:bg-accentDark"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-5 py-2.5 cursor-pointer rounded-sm text-secondary hover:text-primary">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2.5 cursor-pointer rounded-sm text-white bg-accent hover:bg-accentDark">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* mobile headerrrrr */}
        <div className="flex gap-2.5 md:hidden">
          {user && (
            <div className="flex items-center gap-5 md:hidden">
              <Link to="/dashboard">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.profile || avatar}
                  alt="Profile"
                />
              </Link>
            </div>
          )}
          <button className=" block md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {/* overlay start */}
        {open && (
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          >
            {/* menu start */}
            <div
              className={`bg-skin fixed top-16 left-0 h-full w-72 p-2.5  transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="flex items-start flex-col gap-5 pt-10">
                <button onClick={() => setDark(!dark)}>
                  {dark ? (
                    <div className="flex gap-2.5 ">
                      <Sun /> <span>Light Mode</span>
                    </div>
                  ) : (
                    <div className="flex gap-2.5">
                      <Moon />
                      <span>dark Mode</span>
                    </div>
                  )}
                </button>
                <div className="flex flex-col">
                  {user ? (
                    <button
                      onClick={() => {
                        logOut();
                        navigate("/login");
                      }}
                      className="px-5 py-2.5 cursor-pointer rounded-sm text-white bg-accent hover:bg-accentDark"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      {" "}
                      <Link to="/login">
                        <button className="px-5 py-2.5  cursor-pointer rounded-sm text-secondary hover:text-primary">
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="px-5 py-2.5 cursor-pointer rounded-sm text-white bg-accent hover:bg-accentDark">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* menu end */}
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
