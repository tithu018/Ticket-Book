import React, { useState } from "react";
import toast from "react-hot-toast";
import { CalendarPlus, Clock, DollarSign } from "lucide-react";
import { dummyShowsData } from "../../assets/assets";

const AddShows = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(dummyShowsData[0]?._id || "");
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState([]);

  const selectedMovie = dummyShowsData.find((movie) => movie._id === selectedMovieId);

  const addSlot = () => {
    if (!showDate || !showTime) {
      toast.error("Select a show date and time");
      return;
    }

    const slot = `${showDate} ${showTime}`;
    if (slots.includes(slot)) {
      toast.error("This show time is already added");
      return;
    }

    setSlots((current) => [...current, slot]);
    setShowTime("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedMovie || !price || slots.length === 0) {
      toast.error("Select movie, price, and at least one show time");
      return;
    }

    toast.success("Show saved locally");
    setSlots([]);
    setPrice("");
    setShowDate("");
    setShowTime("");
  };

  return (
    <section>
      <div>
        <p className="text-sm text-primary font-medium">Create schedule</p>
        <h1 className="mt-1 text-2xl font-semibold">Add Shows</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        <div>
          <h2 className="mb-4 font-medium">Select Movie</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dummyShowsData.map((movie) => (
              <button
                type="button"
                key={movie._id}
                onClick={() => setSelectedMovieId(movie._id)}
                className={`rounded-lg border p-3 text-left transition ${
                  selectedMovieId === movie._id
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/10 bg-gray-900 hover:border-white/30"
                }`}
              >
                <img src={movie.backdrop_path} alt={movie.title} className="h-32 w-full rounded-md object-cover" />
                <p className="mt-3 truncate font-medium">{movie.title}</p>
                <p className="mt-1 text-xs text-gray-400">{movie.release_date}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <DollarSign className="h-4 w-4 text-primary" />
              Ticket Price
            </span>
            <input
              type="number"
              min="1"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-3 text-sm outline-none focus:border-red-500"
              placeholder="75"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <CalendarPlus className="h-4 w-4 text-primary" />
              Date
            </span>
            <input
              type="date"
              value={showDate}
              onChange={(event) => setShowDate(event.target.value)}
              className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-3 text-sm outline-none focus:border-red-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-primary" />
              Time
            </span>
            <div className="flex gap-2">
              <input
                type="time"
                value={showTime}
                onChange={(event) => setShowTime(event.target.value)}
                className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-3 text-sm outline-none focus:border-red-500"
              />
              <button type="button" onClick={addSlot} className="rounded-md bg-white/10 px-4 text-sm hover:bg-white/20">
                Add
              </button>
            </div>
          </label>
        </div>

        <div className="rounded-lg border border-white/10 bg-gray-900 p-5">
          <h2 className="font-medium">Show Times</h2>
          {slots.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSlots((current) => current.filter((item) => item !== slot))}
                  className="rounded-full bg-red-500/15 px-4 py-2 text-sm text-red-200 hover:bg-red-500/25"
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-400">No show times added yet.</p>
          )}
        </div>

        <button type="submit" className="rounded-md bg-red-500 px-6 py-3 text-sm font-medium transition hover:bg-red-600">
          Save Show
        </button>
      </form>
    </section>
  );
};

export default AddShows;
