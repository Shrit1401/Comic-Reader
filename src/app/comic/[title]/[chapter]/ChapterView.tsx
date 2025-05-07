"use client";

import { useState, useCallback, useEffect } from "react";
import { proxyImage } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Info, BookOpen, Home } from "lucide-react";

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
  const { title, chapter } = params;

  const [viewMode, setViewMode] = useState<"vertical" | "paged">("vertical");
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = useCallback(
    (direction: "prev" | "next") => {
      setCurrentPage((prevCurrentPage) => {
        if (direction === "prev" && prevCurrentPage > 0) {
          return prevCurrentPage - 1;
        } else if (direction === "next" && prevCurrentPage < pages.length - 1) {
          return prevCurrentPage + 1;
        }
        return prevCurrentPage;
      });
    },
    [pages.length]
  );

  useEffect(() => {
    if (viewMode === "paged") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, viewMode]);

  useEffect(() => {
    if (viewMode !== "paged" || pages.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePageChange("prev");
      } else if (event.key === "ArrowRight") {
        handlePageChange("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [viewMode, pages.length, handlePageChange]);

  const PageNavigation = () => (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-lg">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 0}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        {currentPage + 1} / {pages.length}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange("next")}
        disabled={currentPage === pages.length - 1}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );

  if (!pages || pages.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center p-6 bg-background">
        <div className="w-full max-w-4xl mb-8">
          <div className="flex items-center mb-8">
            <Link
              href={`/comic/${title}`}
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Comic Details
            </Link>
          </div>

          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center text-destructive">
                <Info className="mr-2 h-5 w-5" />
                <h2 className="text-lg font-medium">Error</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Chapter not found or has no pages
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-4">
                <Button asChild variant="outline">
                  <Link
                    href={`/comic/${title}`}
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Back to Comic
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-6 bg-background">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/comic/${title}`}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Comic Details
          </Link>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "vertical" | "paged")}
            className="hidden md:block"
          >
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="vertical">Vertical Scroll</TabsTrigger>
              <TabsTrigger value="paged">Paged View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {viewMode === "vertical" ? (
          <div className="w-full flex flex-col items-center">
            {pages.map((page, index) => (
              <div
                key={index}
                className="w-full flex justify-center max-w-4xl mx-auto"
                id={`page-${index + 1}`}
              >
                <div className="relative w-full aspect-[2/3] max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-50px)] rounded-md shadow-md">
                  <Image
                    src={proxyImage(page.image)}
                    alt={`Page ${index + 1}`}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    unoptimized={true}
                  />
                </div>
                <div className="absolute right-4 bottom-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border shadow">
                  {index + 1} / {pages.length}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-5xl mx-auto aspect-[2/3] max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-50px)] rounded-md shadow-md border">
              <Image
                src={proxyImage(pages[currentPage].image)}
                alt={`Page ${currentPage + 1}`}
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                priority
                unoptimized={true}
              />
            </div>
            <PageNavigation />
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mt-8 flex justify-center">
        <Button asChild className="flex items-center gap-2">
          <Link href={`/comic/${title}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            Back to Comic
          </Link>
        </Button>
      </div>
    </div>
  );
}
