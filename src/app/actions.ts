"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { toSlug } from "@/lib/utils";

// Types
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

export interface ComicSearchResult {
  title: string;
  url: string;
  data: string;
}

export interface HotComic {
  title: string;
  urlRaw: string;
  url: string;
  image: string;
}

// Search action
export async function searchComics(
  title: string
): Promise<ComicSearchResult[]> {
  // Try different search strategies until we find results
  const searchStrategies = [
    // Original search
    async () => await performSearch(title),

    // Remove year formats like (2022) or (2022 -)
    async () => {
      const withoutYear = title.replace(
        /\s*\(\d{4}(?:\s*-\s*)?(?:\d{4})?\)\s*/g,
        ""
      );
      if (withoutYear !== title) {
        return await performSearch(withoutYear);
      }
      return [];
    },

    // Try individual words for titles with multiple words (for keywords like "doomsday")
    async () => {
      const words = title.split(/\s+/);
      if (words.length > 1) {
        // Find the longest word (likely the most significant)
        const significantWord = words.reduce((a, b) =>
          a.length > b.length ? a : b
        );

        // Only search if the word is significant (more than 3 characters)
        if (significantWord.length > 3) {
          return await performSearch(significantWord);
        }
      }
      return [];
    },
  ];

  // Try each strategy until we find results
  for (const strategy of searchStrategies) {
    const results = await strategy();
    if (results.length > 0) {
      return results.map((result) => ({
        ...result,
        data: toSlug(result.data),
      }));
    }
  }

  return [];
}

// Helper function to perform the actual search
async function performSearch(title: string): Promise<ComicSearchResult[]> {
  try {
    const response = await axios.get(
      `https://readcomicsonline.ru/search?query=${encodeURIComponent(title)}`
    );
    const body = response.data;

    if (body.suggestions === "") {
      return [];
    }

    return body.suggestions.map(
      (suggestion: { value: string; data: string }) => {
        const title = suggestion.value;
        const data = suggestion.data;
        const url = `/comic/${data}`;

        return {
          title,
          url,
          data,
        };
      }
    );
  } catch (error) {
    console.error(`Error searching comics for '${title}':`, error);
    return [];
  }
}

// Hot comics action
export async function getHotComics(): Promise<HotComic[]> {
  try {
    const url = "https://readcomicsonline.ru/";
    const response = await axios.get(url);

    if (response.status === 500) {
      throw new Error("Server error");
    }

    const body = response.data;
    const $ = cheerio.load(body);
    const comics: HotComic[] = [];

    $("#schedule li").each((i, element) => {
      const item = $(element);
      const title = item.find(".schedule-name").text().trim();
      const urlRaw = item.find(".schedule-name a").attr("href") || "";
      const comicId = urlRaw.split("/").pop() || "";

      // Extract the cover image URL
      const imageElement = item.find("img");
      const image = imageElement.attr("src") || "";

      const comic = {
        title,
        urlRaw,
        url: `/comic/${comicId}`,
        image: image,
      };

      comics.push(comic);
    });

    return comics;
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return [];
  }
}

// Comic details action
export async function getComicDetails(
  slug: string
): Promise<ComicDetail | null> {
  try {
    const url = `https://readcomicsonline.ru/comic/${slug}`;
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);

    const comicTitle = $(
      ".container > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)"
    )
      .text()
      .trim();

    const image = `https:${$(".img-responsive").attr("src")?.trim() || ""}`;

    const type = $(".dl-horizontal > dd:nth-child(2)").text().trim();

    const status = $(".dl-horizontal > dd:nth-child(4)").text().trim();

    const otherName = $(".dl-horizontal > dd:nth-child(6)").text().trim();

    const authors: Author[] = [];
    $(".dl-horizontal > dd:nth-child(8)").each((i, element) => {
      const item = $(element);
      const name = item.find("a").text();
      const author = {
        name,
      };
      authors.push(author);
    });

    const dateRelease = $(".dl-horizontal > dd:nth-child(10)").text();

    const categories: Category[] = [];
    $(".dl-horizontal > dd:nth-child(12)").each((i, element) => {
      const item = $(element);
      const categoryName = item.find("a").text();
      const category = {
        categoryName,
      };
      categories.push(category);
    });

    const views = $(".dl-horizontal > dd:nth-child(17)").text().trim();

    const description = $(".manga > p:nth-child(2)").text().trim();

    const chapters: Chapter[] = [];
    $(".chapters li").each((i, element) => {
      const item = $(element);
      const chapterTitle = item
        .find("h5:nth-child(1) > a:nth-child(1)")
        .text()
        .trim();
      const urlRaw =
        item.find("h5:nth-child(1) > a:nth-child(1)").attr("href") || "";
      const date = item
        .find("div:nth-child(2) > div:nth-child(1)")
        .text()
        .trim();
      const chapterNumber = urlRaw.substr(urlRaw.lastIndexOf("/") + 1);
      const url = `/comic/${slug}/${chapterNumber}`;

      const chapter = {
        title: chapterTitle,
        urlRaw,
        url,
        date,
      };

      chapters.push(chapter);
    });

    return {
      title: comicTitle,
      image,
      type,
      status,
      otherName,
      authors,
      dateRelease,
      categories,
      views,
      description,
      chapters,
    };
  } catch (error) {
    console.error("Error getting comic details:", error);
    return null;
  }
}
