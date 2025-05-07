"use client";

import { ComicDetail } from "@/app/actions";
import { proxyImage, toSlug } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Eye,
  Info,
  BookMarked,
  ListFilter,
  Clock,
} from "lucide-react";

interface ComicDetailViewProps {
  comic: ComicDetail;
}

export default function ComicDetailView({ comic }: ComicDetailViewProps) {
  const formatChapters = () => {
    if (!comic.chapters || comic.chapters.length === 0) return [];

    // Group chapters by volume if possible
    const chapters = [...comic.chapters].sort((a, b) => {
      // Try to extract chapter numbers for comparison
      const aNum = parseFloat(a.title.replace(/chapter\s*/i, "")) || 0;
      const bNum = parseFloat(b.title.replace(/chapter\s*/i, "")) || 0;
      return bNum - aNum;
    });

    return chapters;
  };

  const sortedChapters = formatChapters();
  const comicSlug = toSlug(comic.title);

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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Comic Image */}
        <div className="md:w-1/3">
          {comic.image ? (
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={proxyImage(comic.image)}
                width={300}
                height={450}
                alt={comic.title}
                className="w-full h-auto object-cover"
                unoptimized={true} // Always use unoptimized for external images
              />
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="opacity-90">
                  Comic
                </Badge>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
              <BookMarked className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Comic Info */}
        <div className="md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {comic.title}
            </h1>
            {comic.otherName && (
              <p className="text-muted-foreground">
                Also known as: <span className="italic">{comic.otherName}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                {comic.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  comic.status === "Ongoing"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : comic.status === "Completed"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : ""
                }
              >
                {comic.status}
              </Badge>
            </div>

            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{comic.views}</span>
            </div>

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Released: {comic.dateRelease}</span>
            </div>
          </div>

          {/* Authors */}
          {comic.authors && comic.authors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Authors</h3>
              <div className="flex flex-wrap gap-2">
                {comic.authors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-muted rounded-full pl-1 pr-3 py-0.5"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">
                        {author.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{author.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {comic.categories && comic.categories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-1.5">
                {comic.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="rounded-sm">
                    {category.categoryName}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* First chapter button */}
          {sortedChapters.length > 0 && (
            <Button asChild className="mt-4">
              <Link
                href={`/comic/${comicSlug}/${sortedChapters[
                  sortedChapters.length - 1
                ].urlRaw
                  .split("/")
                  .pop()}`}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Start Reading
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="about" className="mt-10">
        <TabsList className="w-full border-b pb-0 mb-6">
          <TabsTrigger value="about" className="gap-2">
            <Info className="h-4 w-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="chapters" className="gap-2">
            <ListFilter className="h-4 w-4" />
            Chapters ({sortedChapters.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {comic.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>All Chapters</span>
                <Badge variant="outline" className="ml-2">
                  {sortedChapters.length} chapters
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {sortedChapters.length > 0 ? (
                <div className="divide-y">
                  {sortedChapters.map((chapter, index) => {
                    const chapterNumber = chapter.urlRaw.split("/").pop();
                    return (
                      <Link
                        key={index}
                        href={`/comic/${comicSlug}/${chapterNumber}`}
                        className="flex justify-between items-center p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{chapter.title}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{chapter.date}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookMarked className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No chapters available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
