"use client";

import { useState, useEffect, useRef } from "react";
import { searchComics, ComicSearchResult } from "@/services/api";
import Link from "next/link";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<ComicSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [originalSearch, setOriginalSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Function to fetch suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchComics(searchTerm.trim());
      setSuggestions(results);
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        suggestionsRef.current &&
        !searchInputRef.current.contains(e.target as Node) &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced search function
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    setSearched(true);
    setShowSuggestions(false);
    setOriginalSearch(searchTerm.trim());

    const searchResults = await searchComics(searchTerm.trim());
    setResults(searchResults);
    setSearching(false);
  };

  const handleSelectSuggestion = (suggestion: ComicSearchResult) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);
    setOriginalSearch(suggestion.title);

    // Trigger search with the selected suggestion
    setSearching(true);
    setSearched(true);
    setResults([suggestion]);
    setSearching(false);
  };

  // Generate search tips based on the original search
  const getSearchTips = () => {
    if (!originalSearch) return null;

    const tips = [];

    // Check for year pattern
    if (/\b\d{4}\b/.test(originalSearch)) {
      tips.push(
        "Try searching without the year (e.g., 'Grim' instead of 'Grim 2022')"
      );
      tips.push("Try adding parentheses around the year (e.g., 'Grim (2022)')");
    }

    // Multi-word search suggestions
    if (originalSearch.includes(" ")) {
      const words = originalSearch.split(/\s+/);
      if (words.length > 1) {
        const longestWord = words.reduce((a, b) =>
          a.length > b.length ? a : b
        );
        if (longestWord.length > 3) {
          tips.push(`Try searching for just '${longestWord}'`);
        }
      }
    }

    return tips.length > 0 ? tips : null;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <Link href="/" className="self-start mb-6 text-blue-600 hover:underline">
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Search Comics</h1>

      <form onSubmit={handleSearch} className="w-full max-w-3xl mb-8">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter comic title (e.g., 'Grim', 'Avengers Doomsday')"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={searchInputRef}
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {searching ? "Searching..." : "Search"}
          </button>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-[84px] mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {searched && (
        <div className="w-full max-w-3xl">
          {searching ? (
            <p>Searching for comics...</p>
          ) : results.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <ul className="space-y-3">
                {results.map((comic, index) => (
                  <li
                    key={index}
                    className="border p-4 rounded hover:bg-gray-50"
                  >
                    <Link
                      href={`/comic/${comic.data}`}
                      className="text-blue-600 hover:underline text-lg"
                    >
                      {comic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="space-y-4">
              <p>No comics found matching '{originalSearch}'</p>

              {/* Search tips */}
              {getSearchTips() && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-semibold mb-2">Search Tips:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {getSearchTips()?.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick search alternative buttons */}
              {originalSearch.includes(" ") && (
                <div className="space-y-2">
                  <p className="font-semibold">Try one of these searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {originalSearch
                      .split(/\s+/)
                      .filter((word) => word.length > 3)
                      .map((word, index) => (
                        <button
                          key={index}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded"
                          onClick={() => {
                            setSearchTerm(word);
                            handleSearch({
                              preventDefault: () => {},
                            } as React.FormEvent);
                          }}
                        >
                          {word}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
