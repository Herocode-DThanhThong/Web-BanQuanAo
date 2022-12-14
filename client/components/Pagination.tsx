import { useQueryUrl } from "@/hooks/use-query-url";
import { getUrl } from "@/utils/getUrl";
import { useRouter } from "next/router";
import { useState } from "react";
interface PaginationProps {
  pagination:
    | {
        limit: number;
        page: number;
        total: number;
      }
    | undefined;
}
const Pagination = ({ pagination }: PaginationProps) => {
  const {
    page: pageDefault,
    search,
    router,
    price,
    categoryType,
    createdAt,
  } = useQueryUrl();
  const [page, setPage] = useState(pageDefault);
  const { pathname } = useRouter();

  const handlePagination = (pageNumber: number) => {
    if (pagination) {
      if (pageNumber > Math.ceil(pagination.total / pagination.limit)) return;

      const p = pageNumber >= 1 ? pageNumber : 1;
      const url = getUrl(p, search, price, categoryType, createdAt);

      router.push(`${pathname}?${url}`);

      setPage(p);
    }
  };
  return (
    <div className="flex justify-center gap-4 items-center mt-4 relative">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <button
          onClick={() => {
            handlePagination(page - 1);
          }}
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">
          {page}
        </button>
        <button
          onClick={() => {
            handlePagination(page + 1);
          }}
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
      <div className="right-[40%] rounded-md z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">
        {page}/
        {Math.ceil(pagination ? pagination?.total / pagination?.limit : 1)}
      </div>
    </div>
  );
};

export default Pagination;
