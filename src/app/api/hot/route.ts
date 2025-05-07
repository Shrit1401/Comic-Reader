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
    const comics: {
      title: string;
      urlRaw: string;
      url: string;
      image: string;
    }[] = [];

    $("#schedule li").each((i, element) => {
      const item = $(element);
      const title = item.find(".schedule-name").text().trim();
      const urlRaw = item.find(".schedule-name a").attr("href") || "";
      const comicId = urlRaw.substr(urlRaw.lastIndexOf("/") + 1);

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

    return NextResponse.json(comics);
  } catch (error) {
    console.error("Error getting hot comics:", error);
    return NextResponse.json(
      { error: "Failed to fetch hot comics" },
      { status: 500 }
    );
  }
}
