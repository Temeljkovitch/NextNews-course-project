import { getNewsItem } from "@/utils/news";
import { notFound } from "next/navigation";

const ImagePage = async ({ params }) => {
  const newsItem = await getNewsItem(params.newsId);
  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default ImagePage;
