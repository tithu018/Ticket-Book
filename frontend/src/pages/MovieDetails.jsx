import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon, X } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { api } from "../lib/api";

const MovieDetails =()=> {
  const {id} = useParams();
  const [show,setShow] =useState(undefined);
  const [recommendations, setRecommendations] = useState([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    let mounted = true;
    setShow(undefined);

    Promise.all([
      api.getMovie(id),
      api.getMovieShowTimes(id),
      api.listMovies(),
    ])
      .then(([movie, dateTime, movies]) => {
        if (!mounted) {
          return;
        }
        setShow({ movie, dateTime });
        setRecommendations(movies.filter((item) => item._id !== id).slice(0, 4));
      })
      .catch((error) => {
        if (mounted) {
          toast.error(error.message);
          setShow(null);
        }
      });

    return () => {
      mounted = false;
    };
  },[id]);

  const trailer = useMemo(() => {
    const movieIndex = recommendations.findIndex((movie) => movie._id === id);
    return dummyTrailers[Math.max(movieIndex, 0) % dummyTrailers.length];
  }, [id, recommendations]);

  if (show === undefined) {
    return <Loading />;
  }

  if (!show) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <h1 className="text-3xl font-semibold">Movie not found</h1>
        <p className="mt-3 max-w-md text-sm text-gray-400">This movie is not available in the current show list.</p>
        <button
          type="button"
          onClick={() => navigate("/movies")}
          className="mt-7 rounded-md bg-red-500 px-6 py-3 text-sm font-medium transition hover:bg-red-600"
        >
          Back to Movies
        </button>
      </main>
    );
  }

  return (
   <main className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
  <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto items-start">
  
    <img
      src={show.movie.poster_path}
      alt={show.movie.title}
      className="max-md:mx-auto rounded-xl h-104 w-72 object-cover shadow-lg"
    />

    <div className="relative flex flex-col gap-3 text-white">
      <BlurCircle top="-100px" left="-100px" />
      <p className="text-primary">{show.movie.original_language.toUpperCase()}</p>
      <h1 className="text-4xl font-semibold max-w-96 text-balance">
        {show.movie.title}
      </h1>
      <div className="flex items-center gap-2 text-gray-300">
        <StarIcon className="w-5 h-5 text-primary fill-primary" />
        {show.movie.vote_average.toFixed(1)} User Rating
      </div>

      <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
        {show.movie.overview}
      </p>

      <p>
        {timeFormat(show.movie.runtime)} /{" "}
        {show.movie.genres.map((genre) => genre.name).join(", ")} /{" "}
        {show.movie.release_date.split("-")[0]}
      </p>

      <div className="flex items-center flex-wrap gap-4 mt-4">
        <button
          type="button"
          onClick={() => setIsTrailerOpen(true)}
          className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
        >
          <PlayCircleIcon className="w-5 h-5"/>
          Watch Trailer
        </button>
        <a href="#dateSelect" className="px-10 py-3 text-sm bg-red-600 hover:bg-red-700 transition rounded-md font-medium cursor-pointer active:scale-95">Buy Tickets</a>
        <button type="button" className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95" aria-label="Add to favorites">
          <Heart className="w-5 h-5"/>
        </button>
      </div>
    </div>
  </div>

  <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
  <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
    <div className="flex items-center gap-4 w-max px-4">
      {show.movie.casts.slice(0,12).map((cast,index)=>(
        <div key={`${cast.name}-${index}`} className="flex flex-col items-center text-center">
          <img src={cast.profile_path} alt={cast.name} className="rounded-full h-20 md:h-20 aspect-square object-cover" />
          <p className="font-medium text-xs mt-3">{cast.name}</p>
        </div>
      ))}
    </div>
  </div>

  <DateSelect dateTime={show.dateTime} id={id}/>

  <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
  <div className="flex flex-wrap max-sm:justify-center gap-8">
      {recommendations.map((movie)=>(
        <MovieCard key={movie._id} movie={movie} />
      ))}
  </div>

  <div className="flex justify-center mt-20">
    <button onClick={()=>{navigate('/movies'); window.scrollTo(0,0)}} className='px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-full font-medium text-white cursor-pointer'>Show More</button>
  </div>

  {isTrailerOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-black">
        <button
          type="button"
          onClick={() => setIsTrailerOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black"
          aria-label="Close trailer"
        >
          <X className="h-5 w-5" />
        </button>
        <ReactPlayer
          src={trailer.videoUrl}
          controls
          playing
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
        />
      </div>
    </div>
  )}
</main>
  )
}

export default MovieDetails;
