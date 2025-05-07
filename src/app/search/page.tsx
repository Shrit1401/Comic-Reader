"use client";

import { useState } from "react";
import { searchComics, ComicSearchResult } from "@/services/api";
import Link from "next/link";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    setSearched(true);
    const searchResults = await searchComics(searchTerm.trim());
    setResults(searchResults);
    setSearching(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <Link href="/" className="self-start mb-6 text-blue-600 hover:underline">
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Search Comics</h1>

      <form onSubmit={handleSearch} className="w-full max-w-3xl mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter comic title"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {searching ? "Searching..." : "Search"}
          </button>
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
            <p>No comics found matching '{searchTerm}'</p>
          )}
        </div>
      )}
    </main>
  );
}
