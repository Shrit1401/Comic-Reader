"use client";

import { useState, useEffect } from "react";
import { getComicDetails, ComicDetail } from "@/services/api";
import Link from "next/link";
import Image from "next/image";

interface ComicDetailPageProps {
  params: {
    title: string;
  };
}

export default function ComicDetailPage({ params }: ComicDetailPageProps) {
  const [comic, setComic] = useState<ComicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { title } = params;

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        setLoading(true);
        const comicDetails = await getComicDetails(title);
        setComic(comicDetails);
      } catch (err) {
        setError("Failed to load comic details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetails();
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading comic details...</p>
      </div>
    );
  }

  if (error || !comic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-red-500 mb-4">{error || "Comic not found"}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <Link href="/" className="self-start mb-6 text-blue-600 hover:underline">
        Back to Home
      </Link>

      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Comic Image */}
          <div className="md:w-1/3">
            {/* Using img instead of Next.js Image for external URLs */}
            <Image
              src={comic.image}
              width={300}
              height={450}
              alt={comic.title}
              className="w-full object-cover rounded shadow-lg"
            />
          </div>

          {/* Comic Info */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-3">{comic.title}</h1>

            {comic.otherName && (
              <p className="text-gray-600 mb-2">
                Also known as: {comic.otherName}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <span className="font-semibold">Type:</span> {comic.type}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {comic.status}
              </div>
              <div>
                <span className="font-semibold">Release Date:</span>{" "}
                {comic.dateRelease}
              </div>
              <div>
                <span className="font-semibold">Views:</span> {comic.views}
              </div>
            </div>

            {/* Categories */}
            {comic.categories && comic.categories.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Categories:</h3>
                <div className="flex flex-wrap gap-2">
                  {comic.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {category.categoryName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Authors */}
            {comic.authors && comic.authors.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Authors:</h3>
                <div className="flex flex-wrap gap-2">
                  {comic.authors.map((author, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {author.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {comic.description}
          </p>
        </div>

        {/* Chapters */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Chapters</h2>
          {comic.chapters && comic.chapters.length > 0 ? (
            <ul className="space-y-2 mb-6">
              {comic.chapters.map((chapter, index) => {
                // Extract the chapter number from the URL
                const chapterNumber = chapter.urlRaw.split("/").pop();

                return (
                  <li
                    key={index}
                    className="border p-3 rounded hover:bg-gray-50"
                  >
                    <Link
                      href={`/comic/${title}/${chapterNumber}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-blue-600 hover:underline">
                        {chapter.title}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {chapter.date}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No chapters available</p>
          )}
        </div>
      </div>
    </main>
  );
}
