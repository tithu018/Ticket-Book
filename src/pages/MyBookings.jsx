import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dummyBookingData } from "../assets/assets";
import { dateFormat } from "../lib/dateFormat";
import timeFormat from "../lib/timeFormat";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookings(dummyBookingData);
    setLoading(false);
  }, []);

  const handlePayNow = () => {
    toast.success("Payment flow will be connected with backend checkout");
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
                    onClick={handlePayNow}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer text-white"
                  >
                    Pay Now
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
