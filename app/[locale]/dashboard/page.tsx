import MoviesCarouselSkeleton from "@/app/ui/dashboard/MoviesCarouselSkeleton"
import MoviesNowFetch from "@/app/ui/dashboard/MoviesNowFetch"
import { Suspense } from "react"

export default function Dashboard(){
    return(
        <div className="w-full overflow-y-auto overflow-x-hidden h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)]">
            <div className="bg-red-200 w-full h-[60px] flex items-center justify-center text-black">
                <h1>Dashboard</h1>
            </div>
            <Suspense fallback={<MoviesCarouselSkeleton></MoviesCarouselSkeleton>}>
                <MoviesNowFetch></MoviesNowFetch>
            </Suspense>
        </div>
    )
}