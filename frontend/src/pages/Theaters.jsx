import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Monitor, ParkingCircle, Popcorn, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import { api } from "../lib/api";

const Theaters = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listTheaters()
      .then(setTheaters)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-20">
      <BlurCircle top="140px" left="80px" />
      <BlurCircle bottom="120px" right="140px" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium">Cinema locations</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Theaters</h1>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {theaters.map((theater) => (
            <article key={theater._id} className="rounded-lg border border-white/10 bg-gray-900/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{theater.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-primary" />
                    {theater.city} - {theater.address}
                  </p>
                </div>
                <p className="flex items-center gap-1 text-sm text-gray-300">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  4.8
                </p>
              </div>

              <div className="mt-5 flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" />
                  {theater.screens.length} screens
                </span>
                <span className="flex items-center gap-2">
                  <ParkingCircle className="w-4 h-4 text-primary" />
                  Parking
                </span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-400">
                {theater.screens.map((screen) => (
                  <p key={screen._id} className="flex items-center gap-2">
                    <Popcorn className="w-4 h-4 text-primary" />
                    {screen.name}: {screen.seatRows * screen.seatsPerRow} seats
                  </p>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  navigate("/movies");
                  window.scrollTo(0, 0);
                }}
                className="mt-6 w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600"
              >
                View Movies
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Theaters;
