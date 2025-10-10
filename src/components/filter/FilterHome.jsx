"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter } from "next/navigation";
import DrawerSortBy from "./DrawerSortBy";
import Link from "next/link";

export const filterOptions = [
  { label: "Date (newest)", value: "newest" },
  { label: "Date (oldest)", value: "oldest" },
  { label: "Price (highest)", value: "highest" },
  { label: "Price (lowest)", value: "lowest" },
];

const FilterHome = ({ slug, cities, categories, adUnitIds }) => {
  
  const pathname = usePathname();
  const router = useRouter();
  const filterButtonRef = useRef(null);
  const { favIds } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [favorite, setFavorite] = useState(favIds);
  const [isFilterShowing, setIsFilterShowing] = useState(false);
  const [isSortShowing, setIsSortShowing] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [featuredPaginationInfo, setFeaturedPaginationInfo] = useState({});
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = pathname.match(/\/page-(\d+)/)
    ? parseInt(pathname.match(/\/page-(\d+)/)[1])
    : 1;

  const { total_items, total_pages } = paginationInfo || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setFilterIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterButtonRef]);

  const handlePageChange = (e) => {
    const newPathname = pathname.includes("page-")
      ? pathname.replace(
          /\/page-\d+/,
          e.selected == 0 ? "" : `/page-${e.selected + 1}`
        )
      : `${pathname}/page-${e.selected + 1}`;
    router.push(newPathname);
  };

  const handleFilter = (value) => {
    const newPathname = pathname.match(/(newest|oldest|highest|lowest)/)
      ? pathname
          .replace(/(newest|oldest|highest|lowest)/, value)
          .replace(/\/page-\d+/, "")
      : `${pathname.replace(/\/page-\d+/, "")}/${value}`;
    router.push(newPathname);
  };

  const pathSegments = pathname.split("/").filter(Boolean);
  const crumb2 = pathSegments.slice(0, 4);
  const crumb3 = pathSegments.slice(4);
  const label = crumb2.join("-");
  const link = crumb2.join("/");
  const crumb2Obj = { label, link };
  const crumb3Obj = crumb3.map((item) => ({
    label: item,
    link: `${link}/${item}`,
  }));
  const crumbArray = [{ label: "Home", link: "/" }, crumb2Obj, ...crumb3Obj];

  return (
    <div>
      {
        <div className="bg-white shadow-[0_2px_6px_0px_rgba(0,0,0,0.08)] py-5 lg:hidden flex justify-evenly divide-x sticky top-[0px] -mx-4">
          <button
            onClick={() => setIsFilterShowing(true)}
            className="flex justify-center items-center gap-2 text-green-500 font-semibold w-full"
          >
            <Image src={"/icon/filter.svg"} alt="" width={15} height={15} />
            فلتر
          </button>
          <button
            onClick={() => setIsSortShowing(true)}
            className="flex justify-center items-center gap-2 text-green-500 font-semibold w-full"
          >
            <Image src={"/icon/sort.svg"} alt="" width={15} height={15} />
            ترتيب
          </button>
        </div>
      }
      {/*  <div
        className={`h-max  ${
          isFilterShowing
            ? "fixed top-0 left-0 w-full shadow-md"
            : "-ml-[1000px] absolute"
        } transition-all duration-300 z-10 lg:hidden overflow-hidden`}
      >
        <Sidebar
          slug={slug}
          cities={cities}
          categories={categories}
          setLoading={setLoading}
          setSearchResult={setSearchResult}
          setFeaturedData={setFeaturedData}
          setIsShowing={setIsFilterShowing}
          setPaginationInfo={setPaginationInfo}
          setFeaturedPaginationInfo={setFeaturedPaginationInfo}
          page={page}
        />
      </div> */}
      <div
        className={`h-max  ${
          isSortShowing
            ? "fixed top-0 left-0 w-full shadow-md"
            : "-ml-[1000px] absolute"
        } transition-all duration-300 z-10 lg:hidden overflow-hidden`}
      >
        <DrawerSortBy setIsSortShowing={setIsSortShowing} />
      </div>
      <div className="grid lg:grid-cols-[300px_1fr] lg:gap-8 min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] max-h-fit py-7">
        <div
          className={`fixed top-0 transition-all duration-300 ${
            isFilterShowing
              ? "left-0 w-full z-10 shadow-md transform translate-x-0"
              : "-translate-x-[110%] lg:translate-x-0 lg:static"
          }`}
        >
          <Sidebar
            slug={slug}
            cities={cities}
            adUnitIds={adUnitIds}
            categories={categories}
            setLoading={setLoading}
            setSearchResult={setSearchResult}
            setFeaturedData={setFeaturedData}
            setIsShowing={setIsFilterShowing}
            setPaginationInfo={setPaginationInfo}
            setFeaturedPaginationInfo={setFeaturedPaginationInfo}
            page={page}
          />
        </div>
        <div>
          <div className="hidden lg:block mb-6">
            {crumbArray.map((crumb, index) => (
              <span key={index}>
                {index < crumbArray.length - 1 ? (
                  <Link href={`/${crumb.link}`} className="text-green-500">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray55">{crumb.label}</span>
                )}
                {index !== crumbArray.length - 1 && (
                  <Image
                    src="/icon/chevron-right.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="inline-block mx-1"
                  />
                )}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-medium">
            <span className="capitalize">
              {slug[2] == "all-category" ? "جميع العقارات" : slug[2]}
            </span>{" "}
            {"للـ "}
            <span className="capitalize">
              {slug[0] == "buy" ? "شراء" : "إيجار"}
            </span>{" "}
            <span className="capitalize">
              {slug[1] == "all-city" ? "" : `في ${slug[1]}`}
            </span>{" "}
          </h1>
          <p className="mt-4 mb-6">
            {Number(total_items) + Number(featuredPaginationInfo?.total_items)}{" "}
            <span className="capitalize">
              {slug[2] == "all-category" ? "عقار" : slug[2]}
            </span>{" "}
            {"للـ "}{" "}
            <span className="capitalize">
              {slug[0] == "buy" ? "شراء" : "إيجار"}
            </span>
          </p>

          <div className="flex justify-between items-center">
            <p className="text-gray55 text-xl">
              {" "}
              {featuredData?.length ? "العقارات المميزة " : "جميع العقارات"}
            </p>
            <div className="md:flex gap-[10px] hidden">
              <button
                ref={filterButtonRef}
                onClick={() => setFilterIsOpen((prev) => !prev)}
                className="border border-green-500 bg-green-500/10 rounded-[10px] py-2 px-5 flex items-center justify-center gap-2 w-full relative"
              >
                <Image src={"/icon/sort.svg"} alt="" width={20} height={16} />
                الترتيب
                {filterIsOpen && (
                  <div className="absolute top-12 right- min-w-[150px] rounded-lg bg-white shadow-[0_14px_19px_0px_rgba(0,83,40,0.16)] z-10 text-sm">
                    <div
                      className="py-2"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {filterOptions.map(({ label, value }) => (
                        <p
                          key={value}
                          onClick={() => handleFilter(value)}
                          className="px-[20px] py-1 text-dark hover:bg-medium-gray hover:text-green cursor-pointer block"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleFilter(value)
                          }
                        >
                          <span>{label}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-4 lg:mt-8">
            {loading ? (
              <svg
                width="50"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}
                .spinner_Km9P{animation-delay:-.65s}
                .spinner_JApP{animation-delay:-.5s}
                @keyframes spinner_MGfb{93.75%,100%{opacity:.2}}`}
                </style>
                <circle className="spinner_S1WN" cx="4" cy="12" r="3" />
                <circle
                  className="spinner_S1WN spinner_Km9P"
                  cx="12"
                  cy="12"
                  r="3"
                />
                <circle
                  className="spinner_S1WN spinner_JApP"
                  cx="20"
                  cy="12"
                  r="3"
                />
              </svg>
            ) : (
              featuredData?.map((item) => (
                <div key={item?.id} className="mb-0 lg:mb-[50px]">
                  <PropertyCardVertical
                    key={item.id}
                    data={item}
                    favorite={favorite?.includes(item?.id)}
                    setFavorite={setFavorite}
                  />
                </div>
              ))
            )}
          </div>
          {featuredData.length ? (
            <p className="text-gray55 text-xl mt-10">جميع العقارات</p>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-4">
            {loading ? (
              <svg
                width="50"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}
               .spinner_Km9P{animation-delay:-.65s}
               .spinner_JApP{animation-delay:-.5s}
               @keyframes spinner_MGfb{93.75%,100%{opacity:.2}}`}
                </style>
                <circle className="spinner_S1WN" cx="4" cy="12" r="3" />
                <circle
                  className="spinner_S1WN spinner_Km9P"
                  cx="12"
                  cy="12"
                  r="3"
                />
                <circle
                  className="spinner_S1WN spinner_JApP"
                  cx="20"
                  cy="12"
                  r="3"
                />
              </svg>
            ) : searchResult?.length > 0 ? (
              searchResult.map((item, index) => (
                <div key={item?.id} className="mb-0 lg:mb-[50px]">
                  <PropertyCardVertical
                    key={item.id}
                    data={item}
                    favorite={favorite?.includes(item?.id)}
                    setFavorite={setFavorite}
                  />
                </div>
              ))
            ) : (
              <p className="mt-5 text-4xl font-bold mx-auto">لا توجد بيانات!</p>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default FilterHome;
