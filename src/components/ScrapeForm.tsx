'use client'

import React, { useState } from 'react';

export default function ScrapeForm() {
  const [inputType, setInputType] = useState<'sitemap' | 'url'>('sitemap');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement scraping logic
    console.log('Scraping started for:', inputType === 'sitemap' ? sitemapUrl : websiteUrl);
    
    // Simulate loading for now
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Start Scraping in Seconds
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose your preferred method below. Using a sitemap URL will provide more structured results,
            while direct website URL allows for custom crawling.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              className={`flex-1 max-w-md mx-auto sm:mx-0 p-6 rounded-2xl transition-all duration-200 ${
                inputType === 'sitemap'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setInputType('sitemap')}
            >
              <div className="text-lg font-semibold mb-2">Sitemap URL</div>
              <div className={`text-sm ${inputType === 'sitemap' ? 'text-white/80' : 'text-slate-500'}`}>
                Best for structured websites with sitemaps
              </div>
            </button>
            <button
              className={`flex-1 max-w-md mx-auto sm:mx-0 p-6 rounded-2xl transition-all duration-200 ${
                inputType === 'url'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setInputType('url')}
            >
              <div className="text-lg font-semibold mb-2">Website URL</div>
              <div className={`text-sm ${inputType === 'url' ? 'text-white/80' : 'text-slate-500'}`}>
                Best for custom crawling requirements
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label
                htmlFor="url-input"
                className="block text-sm font-medium text-slate-700 mb-2"
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
                className="w-full px-6 py-4 text-lg border border-slate-200 rounded-xl 
                          focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          transition-all duration-200 bg-slate-50 hover:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 
                        hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl
                        transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                        shadow-lg shadow-purple-200 hover:shadow-purple-300"
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
        </div>
      </div>
    </section>
  );
} 