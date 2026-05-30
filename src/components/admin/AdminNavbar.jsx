import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <header className="h-16 border-b border-white/10 bg-[#0f0f13] px-4 md:px-10 flex items-center justify-between">
      <Link to="/admin" className="flex items-center gap-3">
        <img src={assets.logo} alt="Tithu" className="h-9 w-auto" />
        <span className="hidden sm:block rounded-md border border-primary/30 px-2 py-1 text-xs text-primary">
          Admin
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="text-right max-sm:hidden">
          <p className="text-sm font-medium">Admin Panel</p>
          <p className="text-xs text-gray-400">Manage shows and bookings</p>
        </div>
        <img src={assets.profile} alt="Admin profile" className="h-9 w-9 rounded-full object-cover" />
      </div>
    </header>
  );
};

export default AdminNavbar;
