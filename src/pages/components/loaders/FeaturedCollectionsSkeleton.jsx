import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCollectionsSkeleton = () => {
  return (
    <div className="w-full px-4 md:px-10 mt-8">
      
      {/* Title */}
      <Skeleton className="h-8 w-60 mb-8 -ml-10 bg-white/10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative backdrop-blur-md rounded-2xl h-[260px] md:h-[250px] p-6 overflow-hidden bg-black/60 border border-white/10"
          >
            {/* Title */}
            <Skeleton className="h-6 w-40 mx-auto mb-4 bg-white/10" />

            {/* Images */}
            <div className="absolute bottom-[-20px] left-0 w-full flex justify-center items-end">
              
              <Skeleton className="absolute w-28 md:w-32 h-40 rounded-xl -translate-x-16 rotate-[-15deg] bg-white/10" />
              <Skeleton className="absolute w-28 md:w-32 h-40 rounded-xl z-10 bg-white/10" />
              <Skeleton className="absolute w-28 md:w-32 h-40 rounded-xl translate-x-16 rotate-[15deg] bg-white/10" />

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FeaturedCollectionsSkeleton;