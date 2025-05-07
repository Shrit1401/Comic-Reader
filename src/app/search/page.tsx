import { searchComics } from "@/app/actions";
import SearchView from "./SearchView";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const results = query ? await searchComics(query) : [];

  return <SearchView query={query} results={results} />;
}
