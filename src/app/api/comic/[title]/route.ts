import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

interface Author {
  name: string;
}

interface Category {
  categoryName: string;
}

interface Chapter {
  title: string;
  urlRaw: string;
  url: string;
  date: string;
}

export async function GET(
  request: NextRequest,
  context: { params: { title: string } }
) {
  const title = context.params.title;

  try {
    const url = `https://readcomicsonline.ru/comic/${title}`;
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
      const url = `/comic/${title}/${chapterNumber}`;

      const chapter = {
        title: chapterTitle,
        urlRaw,
        url,
        date,
      };

      chapters.push(chapter);
    });

    const results = {
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

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error getting comic details:", error);
    return NextResponse.json(
      { error: "Failed to fetch comic details" },
      { status: 500 }
    );
  }
}
