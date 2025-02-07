interface Url {
  url: string;
  selected: boolean;
  processed: boolean;
  size: number;
}

interface ScrapeResultsProps {
  urls: Url[];
  isLoading: boolean;
}

export default function ScrapeResults({ urls, isLoading }: ScrapeResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="w-full h-2 bg-zinc-100 rounded-full mb-4">
          <div className="h-2 bg-zinc-800 rounded-full animate-pulse"></div>
        </div>
        <p className="text-zinc-600">Fetching URLs... This might take a few moments.</p>
      </div>
    );
  }

  if (!urls?.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-zinc-800 mb-4">Found URLs</h3>
      <div className="bg-white/80 rounded-xl shadow-sm border border-zinc-100">
        {urls.map((url, index) => (
          <div 
            key={url.url}
            className={`p-4 flex items-center justify-between ${
              index !== urls.length - 1 ? 'border-b border-zinc-100' : ''
            }`}
          >
            <div className="truncate flex-1 pr-4">
              <a 
                href={url.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-800 hover:text-zinc-600 truncate"
              >
                {url.url}
              </a>
            </div>
            <div className="text-sm text-zinc-500">
              {(url.size / 1024).toFixed(1)} KB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 