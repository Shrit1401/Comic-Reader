import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // No caching

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing 'url' query parameter", { status: 400 });
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(imageUrl, {
      headers: {
        // Some sites check for a proper user agent
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new NextResponse(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
        {
          status: response.status,
        }
      );
    }

    // Get the image data as an array buffer
    const imageBuffer = await response.arrayBuffer();

    // Determine the content type
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return new NextResponse("Failed to proxy image", { status: 500 });
  }
}
