import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = "https://readcomicsonline.ru/";
    const response = await axios.get(url);

    if (response.status === 500) {
      throw new Error("Server error");
    }

    const body = response.data;
    const $ = cheerio.load(body);
    const comics = [];

    $("#schedule li").each((i, element) => {
      const item = $(element);
      const title = item.find(".schedule-name").text().trim();
      const urlRaw = item.find(".schedule-name a").attr("href") || "";
      const comicId = urlRaw.substr(urlRaw.lastIndexOf("/") + 1);

      const comic = {
        title,
        urlRaw,
        url: `/comic/${comicId}`,
      };

      comics.push(comic);
    });

    return NextResponse.json(comics);
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return NextResponse.json(
      { error: "Failed to fetch hot comics" },
      { status: 500 }
    );
  }
}
