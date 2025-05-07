import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

// Define interface for comic page object
interface ComicPage {
  image: string;
}

// Updated params type to match Next.js expectations
interface RouteParams {
  params: {
    title: string;
    chapter: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string; chapter: string } }
) {
  const { title, chapter } = params;

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

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error getting comic chapter:", error);
    return NextResponse.json(
      { error: "Failed to fetch comic chapter" },
      { status: 500 }
    );
  }
}
