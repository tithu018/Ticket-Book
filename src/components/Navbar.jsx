import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { LogOut, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { clearAuthUser, getAuthUser } from "../lib/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => getAuthUser());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => setUser(getAuthUser());

    syncUser();
    window.addEventListener("auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    clearAuthUser();
    setUser(null);
    closeMenu();
    navigate("/login");
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";

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

        <Link onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/">Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/movies">Movies</Link>
        <Link onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/">Theaters</Link>
        <Link onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/">Releases</Link>
        <Link onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/favorite">Favorites</Link>
        {user ? (
          <>
            <Link className="md:hidden" onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/my-bookings">My Bookings</Link>
            <button type="button" onClick={handleLogout} className="md:hidden">Logout</button>
          </>
        ) : (
          <>
            <Link className="md:hidden" onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/login">Login</Link>
            <Link className="md:hidden" onClick={() => { window.scrollTo(0, 0); closeMenu(); }} to="/signup">Sign Up</Link>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <div className="max-md:hidden flex items-center gap-3">
            <Link to="/login" className="text-sm hover:text-primary transition">Login</Link>
            <Link to="/signup" className="rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600">Sign Up</Link>
          </div>
        ) : (
          <div className="max-md:hidden flex items-center gap-3">
            <Link to="/my-bookings" className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
              {userInitial}
            </Link>
            <button type="button" onClick={handleLogout} aria-label="Logout" className="rounded-md p-2 text-gray-300 transition hover:bg-white/10 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
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
