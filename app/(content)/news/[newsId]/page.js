import { getNewsItem } from "@/utils/news";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleNewsPage = async ({ params }) => {
  const newsItem = await getNewsItem(params.newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image-page`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default SingleNewsPage;
