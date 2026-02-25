  // --- LOADING SKELETON COMPONENT ---
export const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm animate-pulse">
      <div className="w-full h-40 bg-gray-100 rounded-xl mb-4"></div>
      <div className="flex justify-between items-start mb-2">
        <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
        <div className="h-4 w-8 bg-gray-100 rounded"></div>
      </div>
      <div className="h-3 w-1/3 bg-gray-100 rounded mb-4"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 w-16 bg-gray-100 rounded"></div>
        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
