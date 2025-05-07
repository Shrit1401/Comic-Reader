import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { title: string; chapter: string } }
) {
  const { title, chapter } = context.params;

  try {
    const url = `https://readcomicsonline.ru/comic/${title}/${chapter}`;
    const response = await axios.get(url);
    const body = response.data;
    const $ = cheerio.load(body);
    const pages: { image: string }[] = [];

    $("#all img").each((i, element) => {
      const item = $(element);
      const image = item.attr("data-src")?.trim();

      if (image) {
        const page = {
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
