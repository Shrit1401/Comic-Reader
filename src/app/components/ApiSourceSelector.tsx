"use client";

export default function ApiSourceSelector() {
  return (
    <div className="flex items-center">
      <div className="flex-grow">
        <div className="flex items-center bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
          <svg
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-blue-700">
            Comic &amp; Manga Platform - Access both Western comics and Japanese
            manga
          </span>
        </div>
      </div>
    </div>
  );
}
