import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import { saveAuthUser } from "../lib/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Complete all signup fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    saveAuthUser({
      name: formData.name,
      email: formData.email,
    });

    toast.success("Account created");
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <main className="relative min-h-[80vh] px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-20 overflow-hidden">
      <BlurCircle top="120px" left="80px" />
      <BlurCircle bottom="80px" right="120px" />

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md mx-auto rounded-lg border border-white/10 bg-gray-900/80 p-6 md:p-8 shadow-2xl">
        <p className="text-primary text-sm font-medium">Start booking</p>
        <h1 className="text-3xl font-semibold mt-2">Create Account</h1>

        <label className="block mt-8 text-sm text-gray-300" htmlFor="name">
          Name
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3">
          <UserRound className="w-5 h-5 text-gray-400" />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <label className="block mt-5 text-sm text-gray-300" htmlFor="email">
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
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95">
          Sign Up
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:text-red-400">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
