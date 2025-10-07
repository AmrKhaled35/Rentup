"use client";

import MyListingsCard from "../cards/MyListingsCard";
import NotFound from "../shared/NotFound";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { authKey } from "@/constant";

const MyListings = ({ properties, status }) => {
  const search = useSearchParams();
  const searchParams = new URLSearchParams(search);
  const router = useRouter();
  const token = Cookies.get(authKey);

  const handleClick = (tab) => {
    searchParams.set("status", tab);
    router.push(`?${searchParams}`);
  };

  return (
    <div className="bg-white xl:border border-[#E6E6EB] xl:rounded-xl p-3 md:p-5 -mx-3 xl:mx-0 h-full">
      <div className="text-dark text-[15px] font-[700] mb-[27px]">
        عقاراتي
      </div>
      <div className="flex flex-wrap gap-[7px] md:gap-[10px] mb-[27px]">
        <button
          className={
            (status === "active"
              ? "text-white bg-green-500"
              : "text-green-500 bg-green-100") +
            " border border-green-500 px-[17.25px] py-[7.5px] rounded-[43px] font-medium text-[12px] sm:text-[14.25px]"
          }
          onClick={() => handleClick("active")}
        >
          نشطة
        </button>
        <button
          className={
            (status === "unpublish"
              ? "text-white bg-green-500"
              : "text-green-500 bg-green-100") +
            " border border-green-500 px-[17.25px] py-[7.5px] rounded-[43px] font-medium text-[12px] sm:text-[14.25px]"
          }
          onClick={() => handleClick("unpublish")}
        >
          غير منشورة
        </button>
        <button
          className={
            (status === "pending"
              ? "text-white bg-green-500"
              : "text-green-500 bg-green-100") +
            " border border-green-500 px-[17.25px] py-[7.5px] rounded-[43px] font-medium text-[12px] sm:text-[14.25px]"
          }
          onClick={() => handleClick("pending")}
        >
          قيد الانتظار
        </button>
        <button
          className={
            (status === "disabled"
              ? "text-white bg-green-500"
              : "text-green-500 bg-green-100") +
            " border border-green-500 px-[17.25px] py-[7.5px] rounded-[43px] font-medium text-[12px] sm:text-[14.25px]"
          }
          onClick={() => handleClick("disabled")}
        >
          معطلة
        </button>
        <button
          className={
            (status === "rejected"
              ? "text-white bg-green-500"
              : "text-green-500 bg-green-100") +
            " border border-green-500 px-[17.25px] py-[7.5px] rounded-[43px] font-medium text-[12px] sm:text-[14.25px]"
          }
          onClick={() => handleClick("rejected")}
        >
          مرفوضة
        </button>
      </div>
      {properties.length > 0 ? (
        <div className="grid gap-[20px]">
          {status !== "draft" &&
            properties?.map((item) => (
              <MyListingsCard key={item?.id} data={item} token={token} />
            ))}
        </div>
      ) : (
        <div>
          <NotFound message="لا توجد بيانات للعقارات" />
        </div>
      )}
    </div>
  );
};

export default MyListings;
