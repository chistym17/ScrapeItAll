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
  const [loadingUrls, setLoadingUrls] = useState<string[]>([]);
  
  const showMore = () => {
    setDisplayCount(prev => Math.min(prev + 20, urls.length));
  };

  const handleGetContent = async (url: string) => {
    setLoadingUrls(prev => [...prev, url]);
    try {
      const response = await fetch(`http://localhost:8000/api/fetch-content/?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data) {
        console.log('Content extracted:', data);
      } else {
        console.error('Failed to extract content');
      }
    } catch (error) {
      console.error('Error extracting content:', error);
    } finally {
      setLoadingUrls(prev => prev.filter(u => u !== url));
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-zinc-800 mb-4">
        Found Pages ({urls.length})
      </h3>
      <div className="space-y-3">
        {urls.slice(0, displayCount).map((url, index) => (
          <div 
            key={index}
            className="p-4 bg-white rounded-lg shadow-sm border border-zinc-100 flex justify-between items-center"
          >
            <span className="text-zinc-800 truncate flex-1">{url.url}</span>
            <button
              onClick={() => handleGetContent(url.url)}
              disabled={loadingUrls.includes(url.url)}
              className="ml-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white 
                         rounded-lg transition-colors duration-200 text-sm
                         disabled:bg-zinc-400 disabled:cursor-not-allowed flex items-center"
            >
              {loadingUrls.includes(url.url) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                'Get Content'
              )}
            </button>
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