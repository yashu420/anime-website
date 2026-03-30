import { Skeleton } from "@/components/ui/skeleton";

const SearchPageSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden"
        >
          {/* Image Skeleton */}
          <Skeleton className="w-full h-64 bg-zinc-800/50 rounded-none" />

          <div className="p-3">
            {/* Title Skeleton */}
            <Skeleton className="h-5 w-3/4 mb-3 bg-zinc-800/50" />

            <div className="flex gap-3 flex-wrap mb-3">
              {/* Info Skeletons */}
              <Skeleton className="h-3 w-16 bg-zinc-800/50" />
              <Skeleton className="h-3 w-20 bg-zinc-800/50" />
              <Skeleton className="h-3 w-14 bg-zinc-800/50" />
            </div>

            <div className="w-full flex justify-center mt-2">
              {/* Button Skeleton */}
              <Skeleton className="h-9 w-32 rounded-2xl bg-zinc-800/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPageSkeleton;
