import axios from "axios";

// API sources configuration - This will be a truly unified approach
export type ApiSource = "unified";

// Using unified source that integrates both APIs
let currentApiSource: ApiSource = "unified";

// These functions are kept for backward compatibility
export const setApiSource = (source: ApiSource) => {
  currentApiSource = source;
};

export const getCurrentApiSource = (): ApiSource => {
  return currentApiSource;
};

// Constants for API URLs - both will be used in the unified approach
const API_URLS = {
  default: "", // Empty means use relative URLs with current domain
  mangadex: "https://api.mangadex.org",
};

// Helper to determine if a string looks like a MangaDex ID
const isMangaDexId = (id: string): boolean => {
  // MangaDex IDs are typically UUIDs
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id
  );
};

// Types
export interface ComicSearchResult {
  title: string;
  url: string;
  data: string;
  source?: "default" | "mangadex"; // Track the source
}

// MangaDex specific types
interface MangadexManga {
  id: string;
  type: string;
  attributes: {
    title: Record<string, string>;
    altTitles: Array<Record<string, string>>;
    description: Record<string, string>;
    status: string;
    year: number | null;
    contentRating: string;
    tags: Array<{
      id: string;
      type: string;
      attributes: {
        name: Record<string, string>;
        group: string;
      };
    }>;
    publicationDemographic: string | null;
    createdAt: string;
    updatedAt: string;
  };
  relationships: Array<{
    id: string;
    type: string;
    attributes?: any;
  }>;
}

interface MangadexChapter {
  id: string;
  type: string;
  attributes: {
    title: string;
    volume: string | null;
    chapter: string | null;
    pages: number;
    translatedLanguage: string;
    publishAt: string;
    createdAt: string;
    updatedAt: string;
  };
  relationships: Array<{
    id: string;
    type: string;
  }>;
}

// Existing types
export interface Author {
  name: string;
}

export interface Category {
  categoryName: string;
}

export interface Chapter {
  title: string;
  urlRaw: string;
  url: string;
  date: string;
}

export interface ComicDetail {
  title: string;
  image: string;
  type: string;
  status: string;
  otherName: string;
  authors: Author[];
  dateRelease: string;
  categories: Category[];
  views: string;
  description: string;
  chapters: Chapter[];
  source?: "default" | "mangadex"; // Track the source
}

export interface ComicPage {
  image: string;
}

export interface HotComic {
  title: string;
  urlRaw: string;
  url: string;
  source?: "default" | "mangadex"; // Track the source
}

// MangaDex API helper functions
const convertMangadexMangaToSearchResult = (
  manga: MangadexManga
): ComicSearchResult => {
  const mainTitle =
    manga.attributes.title.en ||
    Object.values(manga.attributes.title)[0] ||
    "Unknown Title";

  return {
    title: mainTitle,
    url: `/comic/${manga.id}`,
    data: manga.id,
    source: "mangadex",
  };
};

const convertMangadexMangaToComicDetail = (
  manga: MangadexManga,
  chapters: MangadexChapter[],
  coverUrl: string = ""
): ComicDetail => {
  const mainTitle =
    manga.attributes.title.en ||
    Object.values(manga.attributes.title)[0] ||
    "Unknown Title";

  // Extract authors from relationships
  const authors: Author[] = manga.relationships
    .filter((rel) => rel.type === "author" || rel.type === "artist")
    .map((author) => ({ name: author.id })); // This is just the ID, ideally we'd fetch author details

  // Extract categories from tags
  const categories: Category[] = manga.attributes.tags.map((tag) => ({
    categoryName:
      tag.attributes.name.en ||
      Object.values(tag.attributes.name)[0] ||
      "Unknown",
  }));

  // Format chapters
  const formattedChapters: Chapter[] = chapters.map((chapter) => ({
    title:
      chapter.attributes.title ||
      `Chapter ${chapter.attributes.chapter || "?"}`,
    urlRaw: chapter.id,
    url: `/comic/${manga.id}/${chapter.id}`,
    date: new Date(chapter.attributes.publishAt).toLocaleDateString(),
  }));

  return {
    title: mainTitle,
    image: coverUrl,
    type: manga.attributes.publicationDemographic || "Manga",
    status: manga.attributes.status || "Unknown",
    otherName: manga.attributes.altTitles
      .map((alt) => Object.values(alt)[0])
      .join(", "),
    authors: authors,
    dateRelease: new Date(manga.attributes.createdAt).toLocaleDateString(),
    categories: categories,
    views: "N/A", // MangaDex doesn't provide view counts
    description:
      manga.attributes.description.en ||
      Object.values(manga.attributes.description)[0] ||
      "No description available",
    chapters: formattedChapters,
    source: "mangadex",
  };
};

// API functions that try your default API first, then fall back to MangaDex
export const searchComics = async (
  title: string
): Promise<ComicSearchResult[]> => {
  try {
    // First try the default API
    try {
      const response = await axios.get(
        `/api/search/${encodeURIComponent(title)}`
      );
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        // Add source marker to each result
        return response.data.map((comic) => ({ ...comic, source: "default" }));
      }
    } catch (defaultError) {
      console.log(
        "Default API search failed, falling back to MangaDex:",
        defaultError
      );
      // Continue to MangaDex if default API fails or returns no results
    }

    // Fall back to MangaDex
    const mangadexResponse = await axios.get(`${API_URLS.mangadex}/manga`, {
      params: {
        title: title,
        limit: 10,
        includes: ["cover_art", "author", "artist"],
      },
    });

    return mangadexResponse.data.data.map(convertMangadexMangaToSearchResult);
  } catch (error) {
    console.error("Error searching comics:", error);
    return [];
  }
};

export const getComicDetails = async (
  title: string
): Promise<ComicDetail | null> => {
  try {
    // Check if the title is a MangaDex ID
    if (isMangaDexId(title)) {
      // Use MangaDex API directly
      return await getMangadexComicDetails(title);
    }

    // Try the default API first
    try {
      const response = await axios.get(`/api/comic/${title}`);
      if (response.data) {
        return { ...response.data, source: "default" };
      }
    } catch (defaultError) {
      console.log(
        "Default API details failed, falling back to MangaDex:",
        defaultError
      );
      // Continue to MangaDex if default API fails
    }

    // At this point, try MangaDex search and get details for the first result
    try {
      const searchResponse = await axios.get(`${API_URLS.mangadex}/manga`, {
        params: {
          title: title,
          limit: 1,
          includes: ["cover_art", "author", "artist"],
        },
      });

      if (searchResponse.data.data && searchResponse.data.data.length > 0) {
        const firstManga = searchResponse.data.data[0];
        return await getMangadexComicDetails(firstManga.id);
      }
    } catch (mangadexError) {
      console.error(
        "Error getting manga details from MangaDex:",
        mangadexError
      );
    }

    return null;
  } catch (error) {
    console.error("Error getting comic details:", error);
    return null;
  }
};

// Helper function for getting MangaDex comic details
const getMangadexComicDetails = async (
  mangaId: string
): Promise<ComicDetail | null> => {
  try {
    // 1. First fetch manga details
    const mangaResponse = await axios.get(
      `${API_URLS.mangadex}/manga/${mangaId}`,
      {
        params: {
          includes: ["cover_art", "author", "artist"],
        },
      }
    );

    // 2. Fetch chapters for this manga
    const chaptersResponse = await axios.get(
      `${API_URLS.mangadex}/manga/${mangaId}/feed`,
      {
        params: {
          limit: 100,
          order: { chapter: "desc" },
          translatedLanguage: ["en"],
        },
      }
    );

    // 3. Fetch cover art
    const manga = mangaResponse.data.data;
    const coverId = manga.relationships.find(
      (rel) => rel.type === "cover_art"
    )?.id;
    let coverUrl = "";

    if (coverId) {
      const coverResponse = await axios.get(
        `${API_URLS.mangadex}/cover/${coverId}`
      );
      const filename = coverResponse.data.data.attributes.fileName;
      coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${filename}`;
    }

    return convertMangadexMangaToComicDetail(
      manga,
      chaptersResponse.data.data,
      coverUrl
    );
  } catch (error) {
    console.error("Error getting MangaDex comic details:", error);
    return null;
  }
};

export const getComicChapter = async (
  title: string,
  chapter: string
): Promise<ComicPage[]> => {
  try {
    // Check if this is a MangaDex ID
    if (isMangaDexId(chapter)) {
      // Use MangaDex API
      return await getMangadexChapter(chapter);
    }

    // Try the default API first
    try {
      const response = await axios.get(`/api/comic/${title}/${chapter}`);
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch (defaultError) {
      console.log(
        "Default API chapter fetch failed, falling back to MangaDex:",
        defaultError
      );
      // If it fails and the title looks like a MangaDex ID, try that API
      if (isMangaDexId(title)) {
        return await getMangadexChapter(chapter);
      }
    }

    return [];
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return [];
  }
};

// Helper function for getting MangaDex chapters
const getMangadexChapter = async (chapterId: string): Promise<ComicPage[]> => {
  try {
    // 1. Get the chapter data with server info
    const atHomeResponse = await axios.get(
      `${API_URLS.mangadex}/at-home/server/${chapterId}`
    );

    // 2. Get the base URL and image filenames
    const serverUrl = atHomeResponse.data.baseUrl;
    const chapterHash = atHomeResponse.data.chapter.hash;
    const pageFilenames = atHomeResponse.data.chapter.data;

    // 3. Build the full image URLs
    return pageFilenames.map((filename: string) => ({
      image: `${serverUrl}/data/${chapterHash}/${filename}`,
    }));
  } catch (error) {
    console.error("Error getting MangaDex chapter:", error);
    return [];
  }
};

export const getHotComics = async (): Promise<HotComic[]> => {
  try {
    // First try the default API
    try {
      const response = await axios.get(`/api/hot`);
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        // Add source marker
        const defaultComics = response.data.map((comic) => ({
          ...comic,
          source: "default",
        }));

        // If we have enough results, return them
        if (defaultComics.length >= 5) {
          return defaultComics;
        }

        // Otherwise, get additional comics from MangaDex to supplement
        const mangadexComics = await getMangadexHotComics(
          10 - defaultComics.length
        );

        // Combine the results, prioritizing default comics
        return [...defaultComics, ...mangadexComics];
      }
    } catch (defaultError) {
      console.log(
        "Default API hot comics fetch failed, falling back to MangaDex:",
        defaultError
      );
    }

    // Fall back to MangaDex
    return await getMangadexHotComics(10);
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return [];
  }
};

// Helper function for getting hot comics from MangaDex
const getMangadexHotComics = async (limit: number): Promise<HotComic[]> => {
  try {
    const response = await axios.get(`${API_URLS.mangadex}/manga`, {
      params: {
        limit: limit,
        order: { followedCount: "desc" }, // Sort by most followed
        includes: ["cover_art"],
      },
    });

    return response.data.data.map((manga: MangadexManga) => {
      const mainTitle =
        manga.attributes.title.en ||
        Object.values(manga.attributes.title)[0] ||
        "Unknown Title";

      return {
        title: mainTitle,
        urlRaw: manga.id,
        url: `/comic/${manga.id}`,
        source: "mangadex",
      };
    });
  } catch (error) {
    console.error("Error getting hot manga from MangaDex:", error);
    return [];
  }
};
