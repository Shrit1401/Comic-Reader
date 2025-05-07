import { getChapterPages } from "./actions";
import ChapterView from "@/app/comic/[title]/[chapter]/ChapterView";

type Params = {
  title: string;
  chapter: string;
};

interface Props {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: Props) {
  const { title, chapter } = props.params;
  const pages = await getChapterPages(title, chapter);

  return <ChapterView params={props.params} pages={pages} />;
}
