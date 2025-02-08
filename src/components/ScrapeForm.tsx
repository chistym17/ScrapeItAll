'use client'

import React, { useState } from 'react';
import PaginatedResults from './PaginatedResults';

interface Url {
  url: string;
  selected: boolean;
  processed: boolean;
  size: number;
}

export default function ScrapeForm() {
  const [inputType, setInputType] = useState<'sitemap' | 'url'>('sitemap');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState<Url[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setUrls([]);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fetch-sitemap/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: inputType === 'sitemap' ? sitemapUrl : websiteUrl,
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setUrls(data.urls);
      } else {
        setError('Failed to fetch URLs. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching the URLs. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-sky-50 to-indigo-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-zinc-800 mb-4">
            Start Scraping in Seconds
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Choose your preferred method below. Using a sitemap URL will provide more structured results,
            while direct website URL allows for custom crawling.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <button
              className={`p-6 rounded-xl transition-all duration-200 ${
                inputType === 'sitemap'
                  ? 'bg-white shadow-md border-2 border-zinc-200'
                  : 'border-2 border-zinc-100 hover:border-zinc-200 bg-transparent hover:bg-white/50'
              }`}
              onClick={() => setInputType('sitemap')}
            >
              <div className={`text-lg font-semibold mb-2 ${
                inputType === 'sitemap' ? 'text-zinc-800' : 'text-zinc-600'
              }`}>Sitemap URL</div>
              <div className="text-sm text-zinc-500">
                Best for structured websites with sitemaps
              </div>
            </button>
            <button
              className={`p-6 rounded-xl transition-all duration-200 ${
                inputType === 'url'
                  ? 'bg-white shadow-md border-2 border-zinc-200'
                  : 'border-2 border-zinc-100 hover:border-zinc-200 bg-transparent hover:bg-white/50'
              }`}
              onClick={() => setInputType('url')}
            >
              <div className={`text-lg font-semibold mb-2 ${
                inputType === 'url' ? 'text-zinc-800' : 'text-zinc-600'
              }`}>Website URL</div>
              <div className="text-sm text-zinc-500">
                Best for custom crawling requirements
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label
                htmlFor="url-input"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                {inputType === 'sitemap' ? 'Enter Sitemap URL' : 'Enter Website URL'}
              </label>
              <input
                type="url"
                id="url-input"
                placeholder={
                  inputType === 'sitemap'
                    ? 'https://example.com/sitemap.xml'
                    : 'https://example.com'
                }
                value={inputType === 'sitemap' ? sitemapUrl : websiteUrl}
                onChange={(e) =>
                  inputType === 'sitemap'
                    ? setSitemapUrl(e.target.value)
                    : setWebsiteUrl(e.target.value)
                }
                className="w-full px-6 py-4 text-lg border border-zinc-200 rounded-xl 
                          focus:ring-2 focus:ring-zinc-800 focus:border-transparent
                          transition-all duration-200 bg-white/50 hover:bg-white"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold 
                        py-4 px-8 rounded-xl transition-all duration-200 
                        disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                  Processing Request...
                </div>
              ) : (
                'Start Scraping'
              )}
            </button>
          </form>

          {urls.length > 0 && <PaginatedResults urls={urls} />}
        </div>
      </div>
    </section>
  );
} 