import React from 'react'

const LoadingSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1d1e30] p-4 rounded-xl shadow-lg animate-pulse space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                  <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                </div>
              </div>
              <div className="w-full h-32 bg-gray-700 rounded-md"></div>
              <div className="h-4 w-32 bg-gray-600 rounded"></div>
              <div className="flex justify-between text-sm text-gray-500">
                <div className="h-4 w-24 bg-gray-600 rounded"></div>
                <div className="h-4 w-20 bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      );
}

export default LoadingSkeleton