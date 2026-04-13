import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

const Pagination = ({ count, page, siblingCount = 1, onChange }) => {
  const totalPages = Math.ceil(count);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onChange(null, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - siblingCount);
    const end = Math.min(totalPages, page + siblingCount);

    for (let i = start; i <= end; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i);
          }}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            i === page
              ? "bg-[#D4A01E] text-white"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          } focus:z-20 focus:outline-offset-0`}
        >
          {i}
        </a>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-bg-dark rounded-lg px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between gap-3 sm:hidden">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
      ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-95"
      }`}
        >
          ← Previous
        </button>

        {/* Next */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
      ${
        page === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-95"
      }`}
        >
          Next →
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 10 + 1}</span>{" "}
            to <span className="font-medium">{Math.min(page * 10, count)}</span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {renderPageNumbers()}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
