"use client";

import Link from "next/link";
import { Search, BookOpen, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <BookOpen className="h-7 w-7" />
          <span className="font-bold text-lg">Shrit Comics</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
          >
            <Search className="h-5 w-5" />
            Browse
          </Link>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 sm:w-1/2">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="/search"
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Search className="h-5 w-5" />
                  Browse
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
