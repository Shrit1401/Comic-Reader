import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApiSourceProvider } from "./components/ApiSourceProvider";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shrit Comics",
  description: "Read your favorite comics online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-b from-background to-background/95 font-sans antialiased`}
      >
        <ApiSourceProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <footer className="py-6 md:px-8 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © {new Date().getFullYear()} Shrit Comics. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </ApiSourceProvider>
      </body>
    </html>
  );
}
