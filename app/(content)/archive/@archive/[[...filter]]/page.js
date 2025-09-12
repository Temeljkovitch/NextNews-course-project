import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/utils/news";
import Link from "next/link";

const FilteredNewsPage = ({ params }) => {
  const selectedYear = params.filter?.[0]; // filter ? filter[0] : undefined
  const selectedMonth = params.filter?.[1]; // filter ? filter[1] : undefined

  let news;
  let yearsLinks = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    yearsLinks = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    yearsLinks = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {yearsLinks.map((year) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${year}`
                : `/archive/${year}`;
              return (
                <li>
                  <Link key={year} href={href}>
                    {year}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};
export default FilteredNewsPage;
