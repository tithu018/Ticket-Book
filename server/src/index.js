import express from "express";
import cors from "cors";

import movies from "../data/movies.js";
import showtimes from "../data/showtimes.js";
import bookings from "../data/bookings.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((item) => item._id === req.params.id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.json(movie);
});

app.get("/api/movies/:id/showtimes", (req, res) => {
  const movie = movies.find((item) => item._id === req.params.id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.json({ movieId: movie._id, dateTime: showtimes });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.post("/api/bookings", (req, res) => {
  const { showId, bookedSeats, amount } = req.body || {};
  if (!showId || !Array.isArray(bookedSeats) || bookedSeats.length === 0) {
    return res.status(400).json({ message: "Missing showId or bookedSeats" });
  }

  const newBooking = {
    _id: `booking_${Date.now()}`,
    user: { name: "Guest" },
    show: {
      _id: showId,
      movie: movies[0],
      showDateTime: new Date().toISOString(),
      showPrice: 59,
    },
    amount: amount ?? bookedSeats.length * 59,
    bookedSeats,
    isPaid: false,
  };

  bookings.unshift(newBooking);
  res.status(201).json(newBooking);
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
