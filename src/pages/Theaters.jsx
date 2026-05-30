import React from "react";
import { MapPin, Monitor, ParkingCircle, Popcorn, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";

const theaters = [
  {
    name: "Tithu Central Cinema",
    location: "Kandy City Centre",
    screens: 5,
    rating: 4.8,
    features: ["Dolby Atmos", "Premium recliners", "Online snacks"],
  },
  {
    name: "Tithu Liberty Hall",
    location: "Colombo 03",
    screens: 4,
    rating: 4.6,
    features: ["Laser projection", "Family lounge", "Free parking"],
  },
  {
    name: "Tithu Lakeside",
    location: "Nuwara Eliya Road",
    screens: 3,
    rating: 4.5,
    features: ["Balcony seating", "Cafe counter", "Accessible entry"],
  },
];

const Theaters = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-20">
      <BlurCircle top="140px" left="80px" />
      <BlurCircle bottom="120px" right="140px" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium">Cinema locations</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Theaters</h1>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {theaters.map((theater) => (
            <article key={theater.name} className="rounded-lg border border-white/10 bg-gray-900/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{theater.name}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-primary" />
                    {theater.location}
                  </p>
                </div>
                <p className="flex items-center gap-1 text-sm text-gray-300">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {theater.rating}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-primary" />
                  {theater.screens} screens
                </span>
                <span className="flex items-center gap-2">
                  <ParkingCircle className="w-4 h-4 text-primary" />
                  Parking
                </span>
              </div>

              <div className="mt-5 space-y-2 text-sm text-gray-400">
                {theater.features.map((feature) => (
                  <p key={feature} className="flex items-center gap-2">
                    <Popcorn className="w-4 h-4 text-primary" />
                    {feature}
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
