import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/utils/news";
import Link from "next/link";
import { Suspense } from "react";

const FilterHeader = async ({ year, month }) => {
  const availableYears = await getAvailableNewsYears();
  let yearsLinks = availableYears;

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter.");
  }

  if (year && !month) {
    yearsLinks = getAvailableNewsMonths(year);
  }

  if (year && month) {
    yearsLinks = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {yearsLinks.map((yearLink) => {
            const href = year
              ? `/archive/${year}/${yearLink}`
              : `/archive/${yearLink}`;
            return (
              <li key={yearLink}>
                <Link href={href}>{yearLink}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

const FilteredNews = async ({ year, month }) => {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
};

const FilteredNewsPage = async ({ params }) => {
  const selectedYear = params.filter?.[0]; // filter ? filter[0] : undefined
  const selectedMonth = params.filter?.[1]; // filter ? filter[1] : undefined

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};
export default FilteredNewsPage;
