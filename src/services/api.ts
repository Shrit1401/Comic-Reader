import axios from "axios";

// API sources configuration - simplified to just use default API
export type ApiSource = "default";

// Using default source only
let currentApiSource: ApiSource = "default";

// These functions are kept for backward compatibility
export const setApiSource = (source: ApiSource) => {
  currentApiSource = source;
};

export const getCurrentApiSource = (): ApiSource => {
  return currentApiSource;
};

// Types
export interface ComicSearchResult {
  title: string;
  url: string;
  data: string;
  source?: "default"; // Track the source
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
  source?: "default"; // Track the source
}

export interface ComicPage {
  image: string;
}

export interface HotComic {
  title: string;
  urlRaw: string;
  url: string;
  image?: string; // Added image field
  source?: "default"; // Track the source
}

// API functions - simplified to use only default API
export const searchComics = async (
  title: string
): Promise<ComicSearchResult[]> => {
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
    return [];
  } catch (error) {
    console.error("Error searching comics:", error);
    return [];
  }
};

export const getComicDetails = async (
  title: string
): Promise<ComicDetail | null> => {
  try {
    const response = await axios.get(`/api/comic/${title}`);
    if (response.data) {
      return { ...response.data, source: "default" };
    }
    return null;
  } catch (error) {
    console.error("Error getting comic details:", error);
    return null;
  }
};

export const getComicChapter = async (
  title: string,
  chapter: string
): Promise<ComicPage[]> => {
  try {
    const response = await axios.get(`/api/comic/${title}/${chapter}`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return [];
  }
};

export const getHotComics = async (): Promise<HotComic[]> => {
  try {
    const response = await axios.get(`/api/hot`);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      // Add source marker
      return response.data.map((comic) => ({
        ...comic,
        source: "default",
      }));
    }
    return [];
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return [];
  }
};
