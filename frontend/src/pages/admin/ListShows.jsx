import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dateFormat } from "../../lib/dateFormat";
import Loading from "../../components/Loading";
import { api } from "../../lib/api";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listAdminShows()
      .then(setShows)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <div>
        <p className="text-sm text-primary font-medium">Show inventory</p>
        <h1 className="mt-1 text-2xl font-semibold">List Shows</h1>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium">Movie</th>
                <th className="px-5 py-3 font-medium">Show Time</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Booked Seats</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show._id} className="border-t border-white/10">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={show.movie.poster_path} alt={show.movie.title} className="h-14 w-10 rounded object-cover" />
                      <span className="font-medium">{show.movie.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{dateFormat(show.showDateTime)}</td>
                  <td className="px-5 py-4">{currency}{show.showPrice}</td>
                  <td className="px-5 py-4">{Object.keys(show.occupiedSeats).length}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-300">Active</span>
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

export default ListShows;
