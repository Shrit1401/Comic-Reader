"use client";

export default function MangaDexBanner() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 w-full max-w-3xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            Welcome to our{" "}
            <span className="font-semibold">Comic & Manga Platform</span>.
            Browse Western comics from our collection, with additional manga
            content from MangaDex.
            <span className="block mt-1 text-xs">
              Results will prioritize comics from our collection when available.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
