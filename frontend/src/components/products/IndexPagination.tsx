import Link from "next/link";

import { Pagination } from "@/types/foods";

const IndexPagination = ({ pagination }: { pagination: Pagination }) => {
  const pages = Array.from(Array(pagination.total_pages).keys(), (i) => i + 1);

  return (
    <nav className="mx-auto flex flex-wrap items-center justify-center space-x-2 px-2">
      {/* ページリンクの動的生成 */}
      {pages.map((page) => {
        return (
          <Link
            key={page}
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full p-4 text-sm font-medium ${
              // 現在のページがcurrent_pageであれば背景を色付けする
              page === pagination.current_page
                ? "bg-blue-400 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
            href={`/products/pages/${page}`}
            aria-current={page === pagination.current_page ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
};

export default IndexPagination;
