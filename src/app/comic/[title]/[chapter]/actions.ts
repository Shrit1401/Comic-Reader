"use server";

import axios from "axios";
import * as cheerio from "cheerio";

export interface ComicPage {
  image: string;
}

export async function getChapterPages(
  title: string,
  chapter: string
): Promise<ComicPage[]> {
  try {
    const url = `https://readcomicsonline.ru/comic/${title}/${chapter}`;
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);
    const pages: ComicPage[] = [];

    $("#all img").each((i, element) => {
      const item = $(element);
      const image = item.attr("data-src")?.trim();

      if (image) {
        const page: ComicPage = {
          image,
        };
        pages.push(page);
      }
    });

    return pages;
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return [];
  }
}
