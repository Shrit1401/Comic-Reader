import axios from "axios";

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

// API functions
export const searchComics = async (
  title: string
): Promise<ComicSearchResult[]> => {
  try {
    const response = await axios.get(
      `/api/search/${encodeURIComponent(title)}`
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
    const response = await axios.get(`/api/comic/${title}`);
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
    const response = await axios.get(`/api/comic/${title}/${chapter}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return [];
  }
};

export const getHotComics = async (): Promise<HotComic[]> => {
  try {
    const response = await axios.get("/api/hot");
    return response.data;
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return [];
  }
};
