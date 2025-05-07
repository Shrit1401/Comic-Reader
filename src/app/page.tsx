import { getHotComics } from "./actions";
import HomeView from "@/app/HomeView";
import { Metadata } from "next";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

interface Props {
  searchParams: SearchParams;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Comic Reader - Read Comics Online",
    description:
      "Read your favorite comics online for free. Browse through our collection of comics and manga.",
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const hotComics = await getHotComics();
  return <HomeView hotComics={hotComics} />;
}
