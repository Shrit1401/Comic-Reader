"use client";

import { useState } from "react";
import { HotComic } from "./actions";
import { proxyImage } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import ApiSourceSelector from "./components/ApiSourceSelector";
import { useApiSource } from "./components/ApiSourceProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Settings, BookMarked } from "lucide-react";

interface HomeViewProps {
  hotComics: HotComic[];
}

export default function HomeView({
  hotComics: initialHotComics,
}: HomeViewProps) {
  const [hotComics] = useState(initialHotComics);
  const {} = useApiSource();

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <BookOpen className="h-12 w-12 mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Comic Reader</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-[600px]">
          Discover and enjoy your favorite comics from our extensive collection
        </p>
      </div>

      <Tabs defaultValue="trending" className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <Link href="/search">
            <Button variant="outline" className="ml-auto">
              Browse All Comics
            </Button>
          </Link>
        </div>

        <TabsContent value="trending" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotComics.length > 0 ? (
              hotComics.map((comic, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {comic.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="outline">Comic</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[2/3] rounded-md overflow-hidden relative">
                      {comic.image ? (
                        <Image
                          src={proxyImage(comic.image)}
                          alt={comic.title}
                          fill
                          className="object-cover"
                          unoptimized={true}
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <BookMarked className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link href={comic.url}>
                          <Button variant="default" size="sm">
                            Read Now
                          </Button>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 text-sm" side="top">
                        <div className="space-y-1">
                          <h4 className="font-medium">{comic.title}</h4>
                          <p className="text-muted-foreground text-xs">
                            Click to view details and available chapters
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">
                  No comics found. Make sure the API server is running.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>API Source Settings</CardTitle>
              <CardDescription>
                Configure the comic API settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiSourceSelector />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
