import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dateFormat } from "../lib/dateFormat";
import timeFormat from "../lib/timeFormat";
import { api } from "../lib/api";
import { getAuthUser } from "../lib/auth";

const MyBookings = () => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    if (!getAuthUser()) {
      toast.error("Login to view your bookings");
      navigate("/login");
      return;
    }

    api.listMyBookings()
      .then(setBookings)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handlePayNow = async (bookingId) => {
    try {
      setPayingId(bookingId);
      await api.confirmPayment({ bookingId: Number(bookingId) });
      toast.success("Payment confirmed");
      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? { ...booking, isPaid: true } : booking
        )
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative px-6 md:px-16 lg:px-40 pt-32 md:pt-40 min-h-[80vh] overflow-hidden">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" right="160px" />
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <article key={`${item._id}-${index}`} className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl">
            <div className="flex flex-col md:flex-row">
              <img src={item.show.movie.poster_path} alt={item.show.movie.title} className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded" />
              <div className="flex flex-col p-4">
                <h2 className="text-lg font-semibold">{item.show.movie.title}</h2>
                <p className="text-sm text-gray-400">{timeFormat(item.show.movie.runtime)}</p>
                <p className="text-sm text-gray-400 mt-auto">{dateFormat(item.show.showDateTime)}</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end md:text-right justify-between p-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold mb-3">{currency}{item.amount}</p>
                {!item.isPaid && (
                  <button
                    type="button"
                    onClick={() => handlePayNow(item._id)}
                    disabled={payingId === item._id}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {payingId === item._id ? "Paying..." : "Pay Now"}
                  </button>
                )}
              </div>
              <div className="text-sm">
                <p><span className="text-gray-400">Total Tickets: </span>{item.bookedSeats.length}</p>
                <p><span className="text-gray-400">Seat Numbers: </span>{item.bookedSeats.join(", ")}</p>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="mt-10 rounded-lg border border-white/10 bg-gray-900 p-8 text-center text-gray-400">
          No bookings found.
        </div>
      )}
    </main>
  );
};

export default MyBookings;
