import { fetchNowPlayingMovies } from "@/app/lib/data"
import MoviesNowCarousel from "./MoviesNowCarousel";

export default async function MoviesNowFetch(){
    const moviesData = await fetchNowPlayingMovies("es")

    if (moviesData) {
        const moviesPosters = moviesData[0];
        const data = moviesData[1];

        return (
            <MoviesNowCarousel moviesData={data} moviesPoster={moviesPosters} />
        )
    }
}