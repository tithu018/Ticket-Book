const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const fetchJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }
  return response.json();
};

export const api = {
  getMovies: () => fetchJson("/api/movies"),
  getMovie: (id) => fetchJson(`/api/movies/${id}`),
  getShowtimes: (id) => fetchJson(`/api/movies/${id}/showtimes`),
  getBookings: () => fetchJson("/api/bookings"),
  createBooking: (payload) =>
    fetchJson("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};
