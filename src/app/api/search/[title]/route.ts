import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  const title = params.title;

  try {
    const response = await axios.get(
      `https://readcomicsonline.ru/search?query=${encodeURIComponent(title)}`
    );
    const body = response.data;

    if (body.suggestions === "") {
      return NextResponse.json("Not Found", { status: 404 });
    }

    const results = [];

    for (let i = 0; i < body.suggestions.length; i++) {
      const title = body.suggestions[i]["value"];
      const data = body.suggestions[i]["data"];
      const url = `/comic/${data}`;

      const result = {
        title,
        url,
        data,
      };

      results.push(result);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error searching comics:", error);
    return NextResponse.json(
      { error: "Failed to fetch comics" },
      { status: 500 }
    );
  }
}
