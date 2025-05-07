"use client";

import { useState, useEffect } from "react";
import { getHotComics, HotComic } from "@/services/api";
import Link from "next/link";
import ApiSourceSelector from "./components/ApiSourceSelector";
import { useApiSource } from "./components/ApiSourceProvider";

export default function Home() {
  const [hotComics, setHotComics] = useState<HotComic[]>([]);
  const [loading, setLoading] = useState(true);
  const { apiSource } = useApiSource();

  const fetchHotComics = async () => {
    setLoading(true);
    const comics = await getHotComics();
    setHotComics(comics);
    setLoading(false);
  };

  // Refetch hot comics when API source changes
  useEffect(() => {
    fetchHotComics();
  }, [apiSource]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-10">Comic Reader</h1>

      <div className="mb-8 w-full max-w-3xl flex flex-col gap-4">
        <ApiSourceSelector />

        <Link
          href="/search"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-fit"
        >
          Search Comics
        </Link>
      </div>

      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Hot Comics</h2>
          <div className="text-sm text-gray-500">
            Source: {apiSource === "default" ? "Default API" : "GitHub API"}
          </div>
        </div>

        {loading ? (
          <p>Loading hot comics...</p>
        ) : hotComics.length > 0 ? (
          <ul className="space-y-3">
            {hotComics.map((comic, index) => (
              <li key={index} className="border p-4 rounded hover:bg-gray-50">
                <Link
                  href={`/comic/${comic.urlRaw.split("/").pop()}`}
                  className="text-blue-600 hover:underline text-lg"
                >
                  {comic.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hot comics found. Make sure the API server is running.</p>
        )}
      </div>
    </main>
  );
}
