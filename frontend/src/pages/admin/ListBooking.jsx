import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dateFormat } from "../../lib/dateFormat";
import Loading from "../../components/Loading";
import { api } from "../../lib/api";

const ListBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listAdminBookings()
      .then(setBookings)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div>
        <p className="text-sm text-primary font-medium">Ticket orders</p>
        <h1 className="mt-1 text-2xl font-semibold">List Bookings</h1>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Movie</th>
                <th className="px-5 py-3 font-medium">Show Time</th>
                <th className="px-5 py-3 font-medium">Seats</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={`${booking._id}-${index}`} className="border-t border-white/10">
                  <td className="px-5 py-4 font-medium">{booking.user.name}</td>
                  <td className="px-5 py-4">{booking.show.movie.title}</td>
                  <td className="px-5 py-4 text-gray-400">{dateFormat(booking.show.showDateTime)}</td>
                  <td className="px-5 py-4">{booking.bookedSeats.join(", ")}</td>
                  <td className="px-5 py-4">{currency}{booking.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs ${
                      booking.isPaid
                        ? "bg-green-500/15 text-green-300"
                        : "bg-yellow-500/15 text-yellow-300"
                    }`}>
                      {booking.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ListBooking;
