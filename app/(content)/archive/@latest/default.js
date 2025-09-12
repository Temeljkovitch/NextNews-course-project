import NewsList from "@/components/news-list";
import { getLatestNews } from "@/utils/news";

const LatestNewsPage = () => {
  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={getLatestNews()} />
    </>
  );
};

export default LatestNewsPage;
