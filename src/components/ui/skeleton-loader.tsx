const ShimmerEffect = () => (
  <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
);

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Filters Skeleton */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <div className="h-6 w-24 mb-4">
            <ShimmerEffect />
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-5 w-20 mb-2">
                <ShimmerEffect />
              </div>
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-4 w-full mb-1">
                  <ShimmerEffect />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="w-full md:w-3/4 md:pl-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="h-40 mb-2">
                  <ShimmerEffect />
                </div>
                <div className="h-4 w-3/4 mb-2">
                  <ShimmerEffect />
                </div>
                <div className="h-4 w-1/2">
                  <ShimmerEffect />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
