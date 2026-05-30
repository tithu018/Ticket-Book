import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import { saveAuthSession } from "../lib/auth";
import { api } from "../lib/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      setSubmitting(true);
      const session = await api.login(formData);
      saveAuthSession(session);
      toast.success("Logged in successfully");
      navigate(session.user?.role === "ADMIN" ? "/admin" : "/my-bookings");
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-[80vh] px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-20 overflow-hidden">
      <BlurCircle top="120px" left="80px" />
      <BlurCircle bottom="80px" right="120px" />

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md mx-auto rounded-lg border border-white/10 bg-gray-900/80 p-6 md:p-8 shadow-2xl">
        <p className="text-primary text-sm font-medium">Welcome back</p>
        <h1 className="text-3xl font-semibold mt-2">Login</h1>

        <label className="block mt-8 text-sm text-gray-300" htmlFor="email">
          Email
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <label className="block mt-5 text-sm text-gray-300" htmlFor="password">
          Password
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3">
          <LockKeyhole className="w-5 h-5 text-gray-400" />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={submitting} className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Logging in..." : "Login"}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          New to Tithu? <Link to="/signup" className="text-primary hover:text-red-400">Create account</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
