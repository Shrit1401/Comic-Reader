"use client";

import { useState, useEffect } from "react";
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
import {
  BookOpen,
  TrendingUp,
  Settings,
  BookMarked,
  Shield,
  Zap,
} from "lucide-react";

interface HomeViewProps {
  hotComics: HotComic[];
}

export default function HomeView({
  hotComics: initialHotComics,
}: HomeViewProps) {
  const [hotComics, setHotComics] = useState<HotComic[]>([]);
  const [mounted, setMounted] = useState(false);
  const {} = useApiSource();

  useEffect(() => {
    setHotComics(initialHotComics);
    setMounted(true);
  }, [initialHotComics]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 py-20 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <BookOpen className="h-16 w-16 mb-4 text-primary animate-pulse" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl" />
            </div>
            <h1 className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Comic Reader
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              Discover and enjoy your favorite comics from our extensive
              collection. Your gateway to endless comic adventures.
            </p>
            <div className="flex gap-4">
              <Link href="/search">
                <Button size="lg" className="rounded-full">
                  Start Reading
                </Button>
              </Link>
              <Link href="/trending">
                <Button size="lg" variant="outline" className="rounded-full">
                  Trending Comics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Comics Section */}
      <div className="container px-4 py-16 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Comics
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover what's trending in the comic world
            </p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="rounded-full">
              View All Comics
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotComics.length > 0 ? (
            hotComics.map((comic, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                    {comic.title}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="outline">Featured</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/3] rounded-md overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
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
                        <Button
                          variant="default"
                          size="sm"
                          className="rounded-full"
                        >
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
      </div>

      {/* Reading Order Section */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Essential Reading Orders
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Dr. Doom Reading Order */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/20 blur-3xl transition-all duration-300 group-hover:scale-150" />
                <h3 className="mb-2 text-2xl font-bold text-red-500">
                  Dr. Doom
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  The brilliant and ruthless ruler of Latveria, Victor von
                  Doom's journey from brilliant scientist to one of Marvel's
                  most complex villains.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2">
                      Origin & Early Years
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-500">
                          1
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Books of Doom (2005)
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Doom's origin story and rise to power in Latveria
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-500">
                          2
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Fantastic Four #5-6 (1962)
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            First appearance and battle with the Fantastic Four
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-400 mb-2">
                      Modern Era
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-500">
                          3
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Doctor Doom (2019)
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Doom's solo series exploring his complex morality
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-500">
                          4
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Infamous Iron Man (2016)
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Doom takes on the mantle of Iron Man
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-500">
                          5
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Secret Wars (2015)
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Doom becomes a god and saves the multiverse
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Invincible Reading Order */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl transition-all duration-300 group-hover:scale-150" />
                <h3 className="mb-2 text-2xl font-bold text-blue-500">
                  Invincible
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Mark Grayson's journey from discovering his powers to becoming
                  Earth's greatest hero in this epic Image Comics series.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">
                      Core Series
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-500">
                          1
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Invincible Compendium 1
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Issues 1-47: Origin and early adventures
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-500">
                          2
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Invincible Compendium 2
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Issues 48-96: Major conflicts and growth
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-500">
                          3
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Invincible Compendium 3
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Issues 97-144: Final battles and conclusion
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">
                      Essential Spin-offs
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-500">
                          4
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Invincible Universe
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Expanded universe stories and side characters
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-500">
                          5
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Tech Jacket
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Space adventures of a key ally
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Batman Reading Order */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-yellow-500/20 blur-3xl transition-all duration-300 group-hover:scale-150" />
                <h3 className="mb-2 text-2xl font-bold text-yellow-500">
                  Batman
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  The Dark Knight's journey from his early days to becoming
                  Gotham's greatest protector in this essential reading order.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">
                      Year One & Early Years
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-medium text-yellow-500">
                          1
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            Year One
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Batman's first year fighting crime in Gotham
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-medium text-yellow-500">
                          2
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            The Long Halloween
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            A year-long mystery with Gotham's rogues gallery
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">
                      Classic Stories
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-medium text-yellow-500">
                          3
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            The Dark Knight Returns
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            An older Batman's return to crimefighting
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-medium text-yellow-500">
                          4
                        </span>
                        <div>
                          <span className="text-muted-foreground">Hush</span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            A mysterious villain targets Batman's allies
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-medium text-yellow-500">
                          5
                        </span>
                        <div>
                          <span className="text-muted-foreground">
                            The Killing Joke
                          </span>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Joker's origin and attack on Gordon family
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/reading-orders">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Reading Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* End of Hero Section */}
    </div>
  );
}
