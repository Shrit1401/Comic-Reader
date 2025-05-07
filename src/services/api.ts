import axios from "axios";

// API sources configuration
export type ApiSource = "default";

// Default source is your current implementation
let currentApiSource: ApiSource = "default";

// Function to change API source
export const setApiSource = (source: ApiSource) => {
  currentApiSource = source;
};

export const getCurrentApiSource = (): ApiSource => {
  return currentApiSource;
};

// Constants for API URLs
const API_URLS = {
  default: "", // Empty means use relative URLs with current domain
};

// Types
export interface ComicSearchResult {
  title: string;
  url: string;
  data: string;
}

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
}

export interface ComicPage {
  image: string;
}

export interface HotComic {
  title: string;
  urlRaw: string;
  url: string;
}

// Helper function to get the base URL for API calls
const getApiBaseUrl = () => {
  return API_URLS[currentApiSource];
};

// API functions
export const searchComics = async (
  title: string
): Promise<ComicSearchResult[]> => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await axios.get(
      `${baseUrl}/api/search/${encodeURIComponent(title)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching comics:", error);
    return [];
  }
};

export const getComicDetails = async (
  title: string
): Promise<ComicDetail | null> => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await axios.get(`${baseUrl}/api/comic/${title}`);
    return response.data;
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
    const baseUrl = getApiBaseUrl();
    const response = await axios.get(
      `${baseUrl}/api/comic/${title}/${chapter}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return [];
  }
};

export const getHotComics = async (): Promise<HotComic[]> => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await axios.get(`${baseUrl}/api/hot`);
    return response.data;
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return [];
  }
};
