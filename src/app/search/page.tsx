"use client";

import { useState, useEffect, useRef } from "react";
import { searchComics, ComicSearchResult } from "@/services/api";
import Link from "next/link";
import ApiSourceSelector from "../components/ApiSourceSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowLeft, Filter, Lightbulb } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<ComicSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [originalSearch, setOriginalSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Function to fetch suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await searchComics(searchTerm.trim());
      setSuggestions(results);
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        suggestionsRef.current &&
        !searchInputRef.current.contains(e.target as Node) &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced search function
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    setSearched(true);
    setShowSuggestions(false);
    setOriginalSearch(searchTerm.trim());

    const searchResults = await searchComics(searchTerm.trim());
    setResults(searchResults);
    setSearching(false);
  };

  const handleSelectSuggestion = (suggestion: ComicSearchResult) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);
    setOriginalSearch(suggestion.title);

    // Trigger search with the selected suggestion
    setSearching(true);
    setSearched(true);
    setResults([suggestion]);
    setSearching(false);
  };

  // Generate search tips based on the original search
  const getSearchTips = () => {
    if (!originalSearch) return null;

    const tips = [];

    // Check for year pattern
    if (/\b\d{4}\b/.test(originalSearch)) {
      tips.push(
        "Try searching without the year (e.g., 'Grim' instead of 'Grim 2022')"
      );
      tips.push("Try adding parentheses around the year (e.g., 'Grim (2022)')");
    }

    // Multi-word search suggestions
    if (originalSearch.includes(" ")) {
      const words = originalSearch.split(/\s+/);
      if (words.length > 1) {
        const longestWord = words.reduce((a, b) =>
          a.length > b.length ? a : b
        );
        if (longestWord.length > 3) {
          tips.push(`Try searching for just '${longestWord}'`);
        }
      }
    }

    return tips.length > 0 ? tips : null;
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search Comics</h1>
        <p className="text-muted-foreground text-center max-w-[600px]">
          Find your favorite comics in our vast collection
        </p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ApiSourceSelector />
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSearch} className="mb-8 relative">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter comic title (e.g., 'Grim', 'Avengers Doomsday')"
              className="pl-10"
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-accent cursor-pointer flex justify-between items-center"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <span className="truncate mr-2">{suggestion.title}</span>
                    <Badge variant="outline">Comic</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" disabled={searching}>
            {searching ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>

      {searched && (
        <div>
          {searching ? (
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-[250px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                      <Skeleton className="h-8 w-[80px]" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search Results
                <Badge variant="outline" className="ml-2">
                  {results.length} found
                </Badge>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.map((comic, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-md transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/comic/${comic.data}`}
                            className="inline-block"
                          >
                            <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
                              {comic.title}
                            </h3>
                          </Link>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0">
                          Comic
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-3 px-4 flex justify-end">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/comic/${comic.data}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-background p-3 mb-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">
                    No comics found matching &apos;{originalSearch}&apos;
                  </p>
                </div>

                {/* Search tips */}
                {getSearchTips() && (
                  <div className="bg-card border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium">Search Tips</h3>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {getSearchTips()?.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick search alternative buttons */}
                {originalSearch.includes(" ") && (
                  <div className="space-y-2">
                    <p className="font-medium flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Try one of these searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {originalSearch
                        .split(/\s+/)
                        .filter((word) => word.length > 3)
                        .map((word, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchTerm(word);
                              handleSearch({
                                preventDefault: () => {},
                              } as React.FormEvent);
                            }}
                          >
                            {word}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
