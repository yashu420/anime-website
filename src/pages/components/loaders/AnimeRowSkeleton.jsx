import { Skeleton } from "@/components/ui/skeleton";

const AnimeRowSkeleton = () => {
  return (
    <div className="mt-8 px-10">
      
      {/* Title skeleton */}
      <Skeleton className="h-8 w-48 mb-8 bg-white/10" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-black/40 border border-white/10"
          >
            {/* Image skeleton */}
            <Skeleton className="h-[240px] w-full bg-white/10" />

            {/* Text skeleton */}
            <div className="px-3 py-3 space-y-2">
              <Skeleton className="h-4 w-[80%] bg-white/10" />
              <Skeleton className="h-3 w-[60%] bg-white/10" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AnimeRowSkeleton;