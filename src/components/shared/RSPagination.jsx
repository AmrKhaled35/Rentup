"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const RSPagination = ({ total_pages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const page = searchParams.get("page") || 1;

  const handlePageChange = (e) => {
    push(`${pathname}?page=${e.selected + 1}`);
  };

  return (
    <ReactPaginate
      pageCount={total_pages}
      pageRangeDisplayed={1}
      marginPagesDisplayed={3}
      forcePage={page - 1}
      nextLabel={
        <div className="h-12 w-12 ml-1 flex justify-center items-center rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      }
      previousLabel={
        <div className="h-12 w-12 mr-1 flex justify-center items-center rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      }
      pageClassName="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full"
      activeClassName="w-8 md:w-10 h-8 md:h-10 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-green-500 text-white"
      containerClassName="flex text-gray-700 items-center font-medium rounded-full bg-white shadow-[0_14px_19px_0px_rgba(21,132,75,0.10)] w-max mx-auto md:p-2 my-8 lg:my-12"
      breakLabel="..."
      onPageChange={handlePageChange}
      renderOnZeroPageCount={null}
    />
  );
};

export default RSPagination;
