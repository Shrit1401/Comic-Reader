"use client";

import { useState, useCallback, useEffect } from "react";
import { proxyImage } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ChapterViewProps {
  params: {
    title: string;
    chapter: string;
  };
  pages: ComicPage[];
}

interface ComicPage {
  image: string;
}

export default function ChapterView({ params, pages }: ChapterViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<"vertical" | "paged">("vertical");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageInput, setPageInput] = useState("");

  const { title } = params;

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
  }, [pages.length]);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPageInput(value);
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pages.length) {
      setCurrentPage(pageNum - 1);
    }
    setPageInput("");
  };

  const handlePageSelect = (value: string) => {
    const pageNum = parseInt(value);
    if (!isNaN(pageNum)) {
      setCurrentPage(pageNum - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevPage, handleNextPage]);

  if (!pages || pages.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">No Pages Found</h1>
          <p className="text-muted-foreground">
            The chapter you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href={`/comic/${title}`}>Back to Comic</Link>
            </Button>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link
                href={`/comic/${title}`}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Comic
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {pages.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {viewMode === "paged" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setViewMode(viewMode === "vertical" ? "paged" : "vertical")
              }
            >
              {viewMode === "vertical" ? "Paged View" : "Vertical View"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div
        className={`${
          isFullscreen ? "h-[calc(100vh-48px)]" : "min-h-[calc(100vh-48px)]"
        } overflow-auto`}
      >
        {viewMode === "vertical" ? (
          // Vertical Scroll View
          <div className="max-w-[1400px] mx-auto px-2 py-4 space-y-2">
            {pages.map((page, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={proxyImage(page.image)}
                  alt={`Page ${index + 1}`}
                  width={1400}
                  height={2000}
                  className="w-full h-auto object-contain"
                  unoptimized={true}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        ) : (
          // Paged View
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-[1400px] mx-auto px-4">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={proxyImage(pages[currentPage].image)}
                    alt={`Page ${currentPage + 1}`}
                    fill
                    className="object-contain"
                    unoptimized={true}
                    priority
                  />
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full rounded-none px-4 hover:bg-background/80"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full rounded-none px-4 hover:bg-background/80"
                    onClick={handleNextPage}
                    disabled={currentPage === pages.length - 1}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Page Navigation Controls */}
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t py-2">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <form
                    onSubmit={handlePageSubmit}
                    className="flex items-center gap-2"
                  >
                    <Input
                      type="number"
                      min={1}
                      max={pages.length}
                      value={pageInput}
                      onChange={handlePageInput}
                      placeholder={`1-${pages.length}`}
                      className="w-20 text-center"
                    />
                    <Button type="submit" size="sm">
                      Go
                    </Button>
                  </form>

                  <Select
                    value={(currentPage + 1).toString()}
                    onValueChange={handlePageSelect}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select page" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          Page {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === pages.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
