import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";
import { api } from "../lib/api";

const FeaturedSection = ()=>{
    const navigate = useNavigate();
    const [shows, setShows] = useState(dummyShowsData.slice(0, 4));

    useEffect(() => {
        let isMounted = true;

        const loadShows = async () => {
            try {
                const data = await api.getMovies();
                if (isMounted) {
                    setShows(data.slice(0, 4));
                }
            } catch (error) {
                if (isMounted) {
                    setShows(dummyShowsData.slice(0, 4));
                }
            }
        };

        loadShows();

        return () => {
            isMounted = false;
        };
    }, []);

    return(
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right='-80px'/>
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button onClick={()=> navigate('/movies')}className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>View All <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/></button>
            </div>
            <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
                {shows.map((show)=>(
                    <MovieCard key={show._id} movie={show}/>
                ))}
            </div>

            <div className='flex justify-center mt-20'>
                <button onClick={()=>{navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 text-sm bg-red-500 hover:bg-red-600 transition rounded-full font-medium text-white cursor-pointer'>show more</button>
            </div>
        </div>
    )
}

export default FeaturedSection;
