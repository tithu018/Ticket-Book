import React from "react";
import { NavLink } from "react-router-dom";
import { CalendarPlus, LayoutDashboard, ListVideo, TicketCheck } from "lucide-react";

const links = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Add Shows", to: "/admin/add-shows", icon: CalendarPlus },
  { label: "List Shows", to: "/admin/list-shows", icon: ListVideo },
  { label: "Bookings", to: "/admin/list-bookings", icon: TicketCheck },
];

const AdminSidebar = () => {
  return (
    <aside className="w-20 md:w-64 shrink-0 border-r border-white/10 bg-[#0f0f13] min-h-[calc(100vh-64px)] py-6">
      <nav className="space-y-2 px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {React.createElement(link.icon, { className: "h-5 w-5 shrink-0" })}
            <span className="max-md:hidden">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
