import { getComicDetails } from "@/app/actions";
import ComicDetailView from "@/app/comic/[title]/ComicDetailView";
import { Metadata } from "next";

type Params = Promise<{
  title: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { title } = await params;
  const comic = await getComicDetails(title);

  if (!comic) {
    return {
      title: title,
      description: `Comic not found`,
    };
  }

  return {
    title: comic.title,
    description: comic.description || `Read ${comic.title} online`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { title } = await params;
  const comic = await getComicDetails(title);

  if (!comic) {
    return <div>Comic not found</div>;
  }

  return <ComicDetailView comic={comic} />;
}
