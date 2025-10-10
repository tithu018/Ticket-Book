import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Temporarily disabled Clerk authentication
  const user = null;
  const openSignIn = () => console.log("Sign in clicked");

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 mdl:px-16 lg:px-36 py-5 bg-black/70 backdrop-blur">
      <Link to="/" className="max-md:px-16">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      {/* Nav links */}
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
          max-md:text-lg z-50 flex flex-col md:flex-row items-center
          max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen
          md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
          border-gray-300/20 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-md:w-full" : "max-md:w-0"
          }`}
      >
        <XIcon
          className="md:hidden absolute right-6 top-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }} to="/">Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }} to="/movies">Movies</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }} to="/">Theaters</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }} to="/">Releases</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }} to="/favorite">Favorites</Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <button onClick={openSignIn} className="max-md:hidden">Login</button>
        ) : (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
