import React, { useState } from 'react';

interface Url {
  url: string;
  selected: boolean;
  processed: boolean;
  size: number;
}

interface PaginatedResultsProps {
  urls: Url[];
}

export default function PaginatedResults({ urls }: PaginatedResultsProps) {
  const [displayCount, setDisplayCount] = useState(10);
  
  const showMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, urls.length));
  };

  return (
    <div className="mt-8">
      <div className="space-y-3">
        {urls.slice(0, displayCount).map((url, index) => (
          <div 
            key={index}
            className="p-4 bg-white rounded-lg shadow-sm border border-zinc-100"
          >
            <div className="flex justify-between items-center">
              <span className="text-zinc-800 truncate">{url.url}</span>
              <span className="text-zinc-500 text-sm">{url.size} bytes</span>
            </div>
          </div>
        ))}
      </div>
      
      {urls.length > displayCount && (
        <button
          onClick={showMore}
          className="mt-6 w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 
                     text-zinc-700 rounded-lg transition-colors duration-200"
        >
          Show More ({urls.length - displayCount} remaining)
        </button>
      )}
    </div>
  );
} 