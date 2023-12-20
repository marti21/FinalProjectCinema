import { Skeleton } from "@nextui-org/react";

export default function MoviesCarouselSkeleton() {
  return (
    <div className="w-full h-fit flex flex-col gap-5 md:py-[100px] py-[40px] md:px-6 md:flex-row md:flex-wrap items-center md:justify-center">
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
        <Skeleton className="rounded md:w-[220px] w-[50%] h-[250px] md:h-[300px]"></Skeleton>
    </div>
  );
}
