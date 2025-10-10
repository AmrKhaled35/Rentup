import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { filterOptions } from "./FilterHome";
import { getFilterData } from "@/actions/actions";
import Ad from "../ads/Ad";

const Sidebar = ({
  slug,
  cities,
  adUnitIds,
  categories,
  setLoading,
  setSearchResult,
  setFeaturedData,
  setIsShowing,
  setPaginationInfo,
  setFeaturedPaginationInfo,
  page,
}) => {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();

  const state = slug[0] === "buy" ? 1 : 2;
  const city = cities?.find(
    (item) => item?.label?.toLowerCase().replace(/\s+/g, "-") === slug[1]
  )?.value;
  const category = categories?.find(
    (item) => item?.label?.toLowerCase().replace(/\s+/g, "-") === slug[2]
  )?.value;
  const sort =
    filterOptions.find((item) => pathname.includes(item.value))?.value ||
    "newest";

  const [priceFrom, setPriceFrom] = useState(search.get("minPrice"));
  const [priceTo, setPriceTo] = useState(search.get("maxPrice"));
  const debouncedPriceFrom = useDebounce(priceFrom);
  const debouncedPriceTo = useDebounce(priceTo);
  
  const fetchData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("listing_type", state);
    formData.append("category", category);
    formData.append("city", city);
    if (priceFrom !== null) formData.append("min_price", priceFrom);
    if (priceTo !== null) formData.append("max_price", priceTo);
    formData.append(
      "sort_by",
      sort === "newest"
        ? "created_at"
        : sort === "oldest"
        ? "created_at"
        : sort === "highest"
        ? "price"
        : sort === "lowest"
        ? "price"
        : ""
    );
    formData.append(
      "sort_direction",
      sort === "newest"
        ? "desc"
        : sort === "oldest"
        ? "asc"
        : sort === "highest"
        ? "desc"
        : sort === "lowest"
        ? "asc"
        : ""
    );
    console.log([...formData.entries()]);
    const { fData, aData } = await getFilterData(page, formData);
    console.log(fData, aData);
    setFeaturedData(fData?.data);
    setSearchResult(aData?.data);
    setFeaturedPaginationInfo(fData?.paginationInfo);
    setPaginationInfo(aData?.paginationInfo);
    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [debouncedPriceFrom, debouncedPriceTo]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (priceFrom) params.append("minPrice", priceFrom);
    if (priceTo) params.append("maxPrice", priceTo);
    const newPathname = `${pathname}${params.toString() ? `?${params}` : ""}`;
    router.push(newPathname);
  }, [debouncedPriceFrom, debouncedPriceTo]);

  return (
    <div className="bg-white md:border md:border-[#E6E6EB] rounded-[10px] md:shadow-[0_2px_12px_0px_rgba(0,0,0,0.06)] px-[18px] pb-1 pt-4 lg:pt-6 h-fit lg:sticky top-6 !overflow-hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <Image
          src={"/icon/arrow-down.svg"}
          alt=""
          width={15}
          height={15}
          className="lg:hidden rotate-90"
          onClick={() => setIsShowing(false)}
        />
        <span className="text-lg font-semibold">الفلاتر</span>
        <Link
          href="/filter/buy/all-city/all-category"
          className="text-green-500 text-xs font-medium px-4 py-1 bg-green-100 rounded-lg"
        >
          إعادة ضبط
        </Link>
      </div>
      <hr className="mt-3 mb-5 -mx-6 lg:hidden" />
      <div className="mt-5">
        <p className="font-medium text-sm mb-4">نوع العقار</p>
        <div className="flex gap-3 flex-wrap text-xs">
          {["buy", "rent"].map((item, i) => (
            <Link
              key={item}
              href={`/filter/${item}/${slug[1]}/${slug[2]}`}
              className={`font-medium px-5 py-2 rounded-full capitalize border ${
                state === i + 1
                  ? "bg-green-100 border-green-500 text-green-500"
                  : "bg-[#F5F5F6] border-[#E6E6EB]"
              }`}
            >
              {item === "buy" ? "شراء" : "إيجار"}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 text-sm">
        <p className="font-medium">الفئة</p>
        <select
          onChange={(e) => {
            router.push(
              `/filter/${slug[0]}/${slug[1]}/${e.target.value
                .replace(/\s+/g, "-")
                .replace(/\?/g, "")
                .toLowerCase()}`
            );
          }}
          className="h-10 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB] form-select mt-3 text-sm"
          value={categories.find((item) => item.value === category)?.label}
        >
          {categories?.map((item) => (
            <option key={item?.value} value={item?.label}>
              {item?.label} 
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 text-sm">
        <p className="font-medium">الموقع</p>
        <select
          onChange={(e) => {
            router.push(
              `/filter/${slug[0]}/${e.target.value
                .replace(/\s+/g, "-")
                .replace(/\?/g, "")
                .toLowerCase()}/${slug[2]}`
            );
          }}
          className="h-10 w-full rounded-[10px] border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB] form-select mt-3 text-sm"
          value={cities.find((item) => item.value === city)?.label}
        >
          {cities?.map((item) => (
            <option key={item?.value} value={item?.label}>
              {item?.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8 text-sm">
        <p className="font-medium mb-4">نطاق السعر ($)</p>
        <div className="flex items-center gap-3">
          <div className="flex w-full">
            <input
              type="text"
              className="h-10 w-full bg-[#F5F5F6] border border-[#E6E6EB] rounded-[10px] text-right pr-3 placeholder:text-[#828282]"
              placeholder="من"
              value={priceFrom || ""}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <input
              type="text"
              className="h-10 w-full bg-[#F5F5F6] border border-[#E6E6EB] rounded-[10px] text-right pr-3 placeholder:text-[#828282]"
              placeholder="إلى"
              value={priceTo || ""}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Ad
        adUnit={adUnitIds?.filter_page_add}
        className="mt-6 w-full flex justify-center items-center"
        sizes={[300, 250]}
      />
    </div>
  );
};

export default Sidebar;
