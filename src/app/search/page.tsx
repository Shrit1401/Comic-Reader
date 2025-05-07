import SearchView from "./SearchView";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search Comics",
    description: "Search for your favorite comics and manga",
  };
}

export default function Page() {
  return <SearchView />;
}
