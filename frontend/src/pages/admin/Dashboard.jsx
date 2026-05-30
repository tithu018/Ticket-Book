import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarClock, DollarSign, Ticket, Users } from "lucide-react";
import { dateFormat } from "../../lib/dateFormat";
import Loading from "../../components/Loading";
import { api } from "../../lib/api";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminDashboard()
      .then(setDashboard)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  const data = dashboard || {
    totalBookings: 0,
    totalRevenue: 0,
    totalUser: 0,
    activeShows: [],
  };

  const stats = [
    { label: "Total Bookings", value: data.totalBookings, icon: Ticket },
    { label: "Revenue", value: `${currency}${data.totalRevenue}`, icon: DollarSign },
    { label: "Users", value: data.totalUser, icon: Users },
    { label: "Active Shows", value: data.activeShows.length, icon: CalendarClock },
  ];

  return (
    <section>
      <div>
        <p className="text-sm text-primary font-medium">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{stat.label}</p>
              {React.createElement(stat.icon, { className: "h-5 w-5 text-primary" })}
            </div>
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-white/10 bg-gray-900 overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold">Active Shows</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium">Movie</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Booked Seats</th>
              </tr>
            </thead>
            <tbody>
              {data.activeShows.map((show) => (
                <tr key={show._id} className="border-t border-white/10">
                  <td className="px-5 py-4 font-medium">{show.movie.title}</td>
                  <td className="px-5 py-4 text-gray-400">{dateFormat(show.showDateTime)}</td>
                  <td className="px-5 py-4">{currency}{show.showPrice}</td>
                  <td className="px-5 py-4">{Object.keys(show.occupiedSeats).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
