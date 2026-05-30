import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { api } from "../lib/api";

const Releases = () => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listReleases()
      .then(setReleases)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-20">
      <BlurCircle top="120px" left="60px" />
      <BlurCircle bottom="100px" right="120px" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-medium">Latest titles</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Releases</h1>

        <div className="mt-8 flex flex-wrap gap-8 max-sm:justify-center">
          {releases.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Releases;
