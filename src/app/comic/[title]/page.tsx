import { getComicDetails } from "@/app/actions";
import ComicDetailView from "./ComicDetailView";

export default async function ComicDetailPage({
  params,
}: {
  params: { title: string };
}) {
  const comic = await getComicDetails(params.title);
  return <ComicDetailView comic={comic} />;
}
