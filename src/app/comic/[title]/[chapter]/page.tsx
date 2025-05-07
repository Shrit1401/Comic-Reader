import { getChapterPages } from "./actions";
import ChapterView from "@/app/comic/[title]/[chapter]/ChapterView";
import { Metadata } from "next";

type Params = Promise<{
  title: string;
  chapter: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { title, chapter } = await params;

  return {
    title: `${title} - Chapter ${chapter}`,
    description: `Read ${title} Chapter ${chapter}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { title, chapter } = await params;
  const pages = await getChapterPages(title, chapter);

  return <ChapterView params={{ title, chapter }} pages={pages} />;
}
