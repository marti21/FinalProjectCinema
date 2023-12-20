'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import './MoviesNowCarousel.css'

interface params{
    moviesData: any,
    moviesPoster: any
}

export default function MoviesNowCarousel({ moviesData, moviesPoster }: params){
    console.log(moviesData)
    console.log(moviesPoster)

    const [isOpen, setIsOpen] = useState(false)
    const [isDown, setIsDown] = useState(false)
    
    const reference = useRef<HTMLDivElement>(null)

    interface MovieData {
        adult: boolean;
        backdrop_path: string;
        genre_ids: Array<number>;
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    const [movieInfo, setDataInfo] = useState<MovieData[]>([]);

    function setDataToVariable(index:any){
        const movieData = moviesData.results[index];
        const dataArray: MovieData[] = [movieData];
        setDataInfo(dataArray)
        setTimeout(goDownToElement, 300)
    }

    function goDownToElement(){
        if(reference.current){
            reference.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    return(
        <div className="w-full">
            <div className="w-full h-fit flex flex-col gap-5 md:py-[100px] py-[40px] md:px-6 md:flex-row md:flex-wrap items-center md:justify-center">
                { moviesPoster && moviesPoster.map((movie: any, index: any) => (
                    <Image key={index} src={`https://image.tmdb.org/t/p/original/${movie}`} width={220} height={200} alt="Movie" className="md:w-[220px] w-[50%] h-[250px] md:h-[300px] rounded hover:scale-105 ease-out duration-300 cursor-pointer" onClick={() => (setIsOpen(true), setDataToVariable(index))} />
                ))}
            </div>
            { isOpen &&
            <motion.div className="w-full h-fit flex items-center justify-center dark:text-white text-black pb-12"
                initial={{ scale: 0, opacity: 0 }}  
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                    <div className="h-fit w-full lg:w-[80%] xl:w-[60%] md:w-[90%] gridMa px-4 md:text-md text-sm" ref={reference}>
                        <div className="h-[70px] flex items-center justify-center border-b-1 border-black dark:border-white">Title</div>
                        <div className="h-[70px] flex items-center justify-start border-b-1 pl-4 border-black dark:border-white">{movieInfo[0].title}</div>
                        <div className="h-[70px] flex items-center justify-center border-b-1 border-black dark:border-white">Description</div>
                        <div className="h-[70px] overflow-y-auto flex md:items-center justify-start text-xs border-b-1 pl-4 border-black dark:border-white">{movieInfo[0].overview}</div>
                        <div className="h-[70px] flex items-center justify-center border-b-1 border-black dark:border-white">Popularity</div>
                        <div className="h-[70px] flex items-center justify-start border-b-1 pl-4 border-black dark:border-white">{movieInfo[0].popularity}</div>
                        <div className="h-[70px] flex items-center justify-center border-b-1 border-black dark:border-white">Realased Data</div>
                        <div className="h-[70px] flex items-center justify-start border-b-1 pl-4 border-black dark:border-white">{movieInfo[0].release_date}</div>
                        <div className="h-[70px] flex items-center justify-center border-b-1 border-black dark:border-white">Vote Average</div>
                        <div className="h-[70px] flex items-center justify-start border-b-1 pl-4 border-black dark:border-white">{movieInfo[0].vote_average}</div>
                    </div>
            </motion.div>
            }
            
        </div>
    )
}