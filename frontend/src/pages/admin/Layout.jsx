import React, { useEffect } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../lib/auth";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getAuthUser();
    if (!user || user.role !== "ADMIN") {
      toast.error("Admin login required");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="py-10 px-4 md:px-10 overflow-y-auto h-[calc(100vh-64px)] flex-1">
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
