import { getChapterPages } from "./actions";
import ChapterView from "@/app/comic/[title]/[chapter]/ChapterView";

type PageProps = {
  params: {
    title: string;
    chapter: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const { title, chapter } = params;
  const pages = await getChapterPages(title, chapter);

  return <ChapterView params={params} pages={pages} />;
}
