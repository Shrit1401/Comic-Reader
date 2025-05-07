import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  const originalTitle = params.title;

  // Try different search strategies until we find results
  const searchStrategies = [
    // Original search
    async () => await performSearch(originalTitle),

    // Remove year formats like (2022) or (2022 -)
    async () => {
      const withoutYear = originalTitle.replace(
        /\s*\(\d{4}(?:\s*-\s*)?(?:\d{4})?\)\s*/g,
        ""
      );
      if (withoutYear !== originalTitle) {
        return await performSearch(withoutYear);
      }
      return [];
    },

    // Try individual words for titles with multiple words (for keywords like "doomsday")
    async () => {
      const words = originalTitle.split(/\s+/);
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
      return NextResponse.json(results);
    }
  }

  // If no results were found with any strategy
  return NextResponse.json([], { status: 404 });
}

// Helper function to perform the actual search
async function performSearch(title: string) {
  try {
    const response = await axios.get(
      `https://readcomicsonline.ru/search?query=${encodeURIComponent(title)}`
    );
    const body = response.data;

    if (body.suggestions === "") {
      return [];
    }

    return body.suggestions.map((suggestion: any) => {
      const title = suggestion["value"];
      const data = suggestion["data"];
      const url = `/comic/${data}`;

      return {
        title,
        url,
        data,
      };
    });
  } catch (error) {
    console.error(`Error searching comics for '${title}':`, error);
    return [];
  }
}
