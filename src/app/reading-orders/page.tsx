"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Zap } from "lucide-react";
import { MarvelReadingOrders } from "./marvel";
import { DCReadingOrders } from "./dc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ReadingOrdersContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const defaultTab = searchParams.get("tab") || "marvel";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-blue-500/10 to-red-500/10 animate-gradient-x" />

      <div className="container relative px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary animate-pulse" />
            <Zap className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 animate-gradient-x">
            Complete Reading Orders
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-[600px]">
            Your ultimate guide to reading Marvel and DC comics in the correct
            order
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-background/50 backdrop-blur-sm border border-primary/20">
            <TabsTrigger
              value="marvel"
              className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300"
            >
              Marvel Comics
            </TabsTrigger>
            <TabsTrigger
              value="dc"
              className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              DC Comics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marvel" className="animate-fade-in">
            <MarvelReadingOrders />
          </TabsContent>

          <TabsContent value="dc" className="animate-fade-in">
            <DCReadingOrders />
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReadingOrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      }
    >
      <ReadingOrdersContent />
    </Suspense>
  );
}
