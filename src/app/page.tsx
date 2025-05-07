import { getHotComics } from "./actions";
import HomeView from "./HomeView";

export default async function HomePage() {
  const hotComics = await getHotComics();
  return <HomeView hotComics={hotComics} />;
}
