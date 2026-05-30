import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CalendarPlus, Clock, DollarSign, Monitor } from "lucide-react";
import Loading from "../../components/Loading";
import { api } from "../../lib/api";

const AddShows = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedScreenId, setSelectedScreenId] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const screens = useMemo(
    () => theaters.flatMap((theater) =>
      theater.screens.map((screen) => ({
        ...screen,
        theaterName: theater.name,
      }))
    ),
    [theaters]
  );

  const selectedMovie = movies.find((movie) => movie._id === selectedMovieId);

  useEffect(() => {
    Promise.all([api.listMovies(), api.listTheaters()])
      .then(([movieItems, theaterItems]) => {
        setMovies(movieItems);
        setTheaters(theaterItems);
        setSelectedMovieId(movieItems[0]?._id || "");
        setSelectedScreenId(theaterItems[0]?.screens?.[0]?._id || "");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const addSlot = () => {
    if (!showDate || !showTime) {
      toast.error("Select a show date and time");
      return;
    }

    const localDate = new Date(`${showDate}T${showTime}`);
    const slot = {
      label: `${showDate} ${showTime}`,
      instant: localDate.toISOString(),
    };

    if (slots.some((item) => item.instant === slot.instant)) {
      toast.error("This show time is already added");
      return;
    }

    setSlots((current) => [...current, slot]);
    setShowTime("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMovie || !selectedScreenId || !price || slots.length === 0) {
      toast.error("Select movie, screen, price, and at least one show time");
      return;
    }

    try {
      setSubmitting(true);
      await Promise.all(slots.map((slot) => api.createAdminShow({
        movieId: Number(selectedMovieId),
        screenId: Number(selectedScreenId),
        showDateTime: slot.instant,
        showPrice: Number(price),
      })));

      toast.success("Show saved");
      setSlots([]);
      setPrice("");
      setShowDate("");
      setShowTime("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
            {movies.map((movie) => (
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

        <div className="grid gap-4 md:grid-cols-4">
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
              <Monitor className="h-4 w-4 text-primary" />
              Screen
            </span>
            <select
              value={selectedScreenId}
              onChange={(event) => setSelectedScreenId(event.target.value)}
              className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-3 text-sm outline-none focus:border-red-500"
            >
              {screens.map((screen) => (
                <option key={screen._id} value={screen._id}>
                  {screen.theaterName} - {screen.name}
                </option>
              ))}
            </select>
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
                  key={slot.instant}
                  type="button"
                  onClick={() => setSlots((current) => current.filter((item) => item.instant !== slot.instant))}
                  className="rounded-full bg-red-500/15 px-4 py-2 text-sm text-red-200 hover:bg-red-500/25"
                >
                  {slot.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-400">No show times added yet.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-red-500 px-6 py-3 text-sm font-medium transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save Show"}
        </button>
      </form>
    </section>
  );
};

export default AddShows;
