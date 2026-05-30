import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-28">
      <BlurCircle top="160px" left="25%" />
      <div className="relative z-10 max-w-md text-center">
        <p className="text-primary text-sm font-medium">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 text-sm text-gray-400">
          The page you opened is not available in this app.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mx-auto mt-7 flex items-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-medium transition hover:bg-red-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </button>
      </div>
    </main>
  );
};

export default NotFound;
