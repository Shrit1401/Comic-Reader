import { getHotComics } from "./actions";
import HomeView from "@/app/HomeView";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Comic Reader - Read Comics Online",
    description:
      "Read your favorite comics online for free. Browse through our collection of comics and manga.",
  };
}

export default async function Page() {
  const hotComics = await getHotComics();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeView hotComics={hotComics} />
    </Suspense>
  );
}
