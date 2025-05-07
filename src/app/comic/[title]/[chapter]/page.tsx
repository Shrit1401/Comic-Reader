import { getChapterPages } from "./actions";
import ChapterView from "./ChapterView";

interface ChapterPageProps {
  params: {
    title: string;
    chapter: string;
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { title, chapter } = params;
  const pages = await getChapterPages(title, chapter);

  return <ChapterView params={params} pages={pages} />;
}
