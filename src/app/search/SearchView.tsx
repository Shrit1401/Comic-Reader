"use client";

import { useState, useEffect, useRef } from "react";
import { ComicSearchResult, searchComics } from "@/app/actions";
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
import { toSlug } from "@/lib/utils";

export default function SearchView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<ComicSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

    const searchResults = await searchComics(searchTerm.trim());
    setResults(searchResults);
    setSearching(false);
  };

  const handleSelectSuggestion = (suggestion: ComicSearchResult) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);

    // Trigger search with the selected suggestion
    setSearching(true);
    setSearched(true);
    setResults([suggestion]);
    setSearching(false);
  };

  // Generate search tips based on the search term
  const getSearchTips = () => {
    if (!searchTerm) return null;

    const tips = [];

    // Check for year pattern
    if (/\b\d{4}\b/.test(searchTerm)) {
      tips.push(
        "Try searching without the year (e.g., 'Grim' instead of 'Grim 2022')"
      );
      tips.push("Try adding parentheses around the year (e.g., 'Grim (2022)')");
    }

    // Multi-word search suggestions
    if (searchTerm.includes(" ")) {
      const words = searchTerm.split(/\s+/);
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
                    className="p-3 hover:bg-accent cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <span>{suggestion.title}</span>
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

      {/* Search Tips */}
      {searched && getSearchTips() && (
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" />
                Search Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {getSearchTips()?.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Results */}
      {searched && (
        <div>
          {searching ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={`/comic/${toSlug(result.title)}`}
                  className="block"
                >
                  <Card className="hover:bg-accent transition-colors">
                    <CardHeader>
                      <CardTitle>{result.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No results found. Try adjusting your search terms.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
