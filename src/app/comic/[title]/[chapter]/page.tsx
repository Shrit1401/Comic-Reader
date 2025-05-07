"use client";

import { useState, useEffect } from "react";
import { getComicChapter, ComicPage } from "@/services/api";
import Link from "next/link";
import Image from "next/image";

interface ChapterPageProps {
  params: {
    title: string;
    chapter: string;
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const [pages, setPages] = useState<ComicPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { title, chapter } = params;

  useEffect(() => {
    const fetchChapterPages = async () => {
      try {
        setLoading(true);
        const chapterPages = await getComicChapter(title, chapter);
        setPages(chapterPages);
      } catch (err) {
        setError("Failed to load chapter pages. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterPages();
  }, [title, chapter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading chapter pages...</p>
      </div>
    );
  }

  if (error || pages.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-red-500 mb-4">
          {error || "Chapter not found or has no pages"}
        </p>
        <Link
          href={`/comic/${title}`}
          className="text-blue-600 hover:underline"
        >
          Return to Comic
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-900">
      <div className="w-full max-w-4xl mb-6 flex justify-between items-center bg-gray-800 p-4 rounded text-white">
        <Link
          href={`/comic/${title}`}
          className="text-blue-400 hover:underline"
        >
          Back to Comic Details
        </Link>
        <h1 className="text-xl font-bold">Chapter {chapter}</h1>
      </div>

      <div className="w-full max-w-4xl">
        {pages.map((page, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={page.image}
              alt={`Page ${index + 1}`}
              className="max-w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              width={1200}
              height={1800}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=="
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl mt-6 text-center">
        <Link
          href={`/comic/${title}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Comic
        </Link>
      </div>
    </main>
  );
}
