import { getChapterPages } from "./actions";
import ChapterView from "@/app/comic/[title]/[chapter]/ChapterView";

export default async function ChapterPage({
  params,
}: {
  params: { title: string; chapter: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { title, chapter } = params;
  const pages = await getChapterPages(title, chapter);

  return <ChapterView params={params} pages={pages} />;
}
