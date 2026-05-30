import { clearAuthUser, getAuthToken } from "./auth";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8081").replace(/\/$/, "");

const request = async (path, options = {}) => {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body = options.body;
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearAuthUser();
    }
    throw new Error(data?.message || data?.error || "Request failed");
  }

  return data;
};

export const api = {
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  signup: (payload) => request("/api/auth/signup", { method: "POST", body: payload }),
  listMovies: () => request("/api/movies"),
  getMovie: (id) => request(`/api/movies/${id}`),
  listReleases: () => request("/api/releases"),
  listTheaters: () => request("/api/theaters"),
  listShows: () => request("/api/shows"),
  getShow: (showId) => request(`/api/shows/${showId}`),
  getMovieShowTimes: (movieId) => request(`/api/shows/movie/${movieId}`),
  getOccupiedSeats: (showId) => request(`/api/shows/${showId}/seats`),
  createBooking: (payload) => request("/api/bookings", { method: "POST", body: payload }),
  listMyBookings: () => request("/api/bookings/my"),
  confirmPayment: (payload) => request("/api/payments", { method: "POST", body: payload }),
  getAdminDashboard: () => request("/api/admin/dashboard"),
  listAdminShows: () => request("/api/admin/shows"),
  createAdminShow: (payload) => request("/api/admin/shows", { method: "POST", body: payload }),
  listAdminBookings: () => request("/api/admin/bookings"),
};
