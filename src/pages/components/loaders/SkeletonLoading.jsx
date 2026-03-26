import { Skeleton } from "@/components/ui/skeleton";

const AnimeDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 pb-16">
      
      {/* Title */}
      <Skeleton className="h-10 w-[300px] mb-8 bg-zinc-900" />

      <div className="flex flex-col md:flex-row gap-10 mb-4">
        
        {/* Image */}
        <Skeleton className="w-72 h-96 rounded-xl bg-zinc-900 shadow-[0_0_20px_rgba(255,0,0,0.2)]" />

        {/* Content */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-4 w-full bg-zinc-900" />
          <Skeleton className="h-4 w-[90%] bg-zinc-900" />
          <Skeleton className="h-4 w-[80%] bg-zinc-900" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[1,2,3,4,5,6].map((i) => (
              <Skeleton key={i} className="h-4 w-[100px] bg-zinc-900" />
            ))}
          </div>
        </div>
      </div>

      {/* Trailer */}
      <Skeleton className="h-[400px] w-full rounded-xl mt-10 bg-zinc-900 shadow-[0_0_25px_rgba(255,0,0,0.2)]" />
    </div>
  );
};

export default AnimeDetailsSkeleton;