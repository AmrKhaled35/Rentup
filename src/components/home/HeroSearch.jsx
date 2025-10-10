"use client";

import Image from "next/image";
import Container from "../shared/Container";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
const priceOptions = [
  { label: "1000₪ إلى 2000", value: "1000,2000" },
  { label: "2000₪ إلى 3000", value: "2000,3000" },
  { label: "3000₪ إلى 4000", value: "3000,4000" },
  { label: "4000₪ إلى 5000", value: "4000,5000" },
  { label: "5000₪ فأكثر", value: "5000,9999999999" },
];



const HeroSearch = ({ cities, categories }) => {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [pRange, setPRange] = useState("");

  const t = useTranslations("hero");

  return (
    <div
      className="mt-[300px] md:mt-[450px] pb-20 w-full absolute left-0"
      dir="rtl"
    >
      <Container>
        <div className="flex text-sm font-medium justify-start right-0">
          <button className="px-7 pt-2 pb-3 bg-white rounded-t-[15px] text-sm lg:text-base">
            {t("Rent")}
          </button>
        </div>
        <div className="p-4 lg:py-6 lg:pr-7 lg:pl-4 bg-white/80 rounded-[20px] rounded-tr-none backdrop-blur-md shadow-sm lg:w-fit">
          <div className="flex flex-wrap items-center gap-4">
            <label
              htmlFor="location"
              className="pl-7 border-l-2 w-[45%] md:flex-1"
            >
              <p className="lg:text-lg font-semibold mr-3">{t("Location")}</p>
              <select
                onChange={(e) => setCity(e.target.value)}
                id="location"
                value={city}
                className="form-select text-grayA6 border-0 focus:border-0 focus:ring-0 bg-transparent text-sm lg:text-base"
              >
                <option value="" disabled>
                  اختر مدينتك
                </option>
                {cities?.map((item) => (
                  <option key={item.id} value={item?.city_name}>
                    {item?.city_name}
                  </option>
                ))}
              </select>
            </label>

            <label
              htmlFor="type"
              className="pl-7 pr-4 md:border-l-2 border-0 w-[45%] md:flex-1"
            >
              <p className="lg:text-lg font-semibold truncate mr-3">
                {t("Property Type")}
              </p>
              <select
                onChange={(e) => setType(e.target.value)}
                id="type"
                value={type}
                className="form-select text-grayA6 border-0 focus:border-0 focus:ring-0 bg-transparent text-sm lg:text-base"
              >
                <option value="" disabled>
                  اختر النوع
                </option>
                {categories?.map((item) => (
                  <option key={item.id} value={item?.category_name}>
                    {item?.category_name}
                  </option>
                ))}
              </select>
            </label>

            <label
              htmlFor="price"
              className="pl-7 lg:pr-4 border-l-2 lg:border-0 w-[45%] md:flex-1"
            >
              <p className="lg:text-lg font-semibold mr-3">{t("Price Range")}</p>
              <select
                onChange={(e) => setPRange(e.target.value)}
                id="price"
                value={pRange}
                className="form-select text-grayA6 border-0 focus:border-0 focus:ring-0 bg-transparent text-sm lg:text-base"
              >
                <option value="" disabled>
                  اختر السعر
                </option>
                {priceOptions.map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="pr-7 flex justify-center items-center w-[45%] md:flex-1">
              <Link
                href={`/filter/rent/${
                  city?.replace(/\s+/g, "-").replace(/\?/g, "").toLowerCase() ||
                  "all-city"
                }/${
                  type?.replace(/\s+/g, "-").replace(/\?/g, "").toLowerCase() ||
                  "all-category"
                }${
                  pRange
                    ? `?minPrice=${pRange.split(",")[0]}&maxPrice=${
                        pRange.split(",")[1]
                      }`
                    : ""
                }`}
              >
                <Image
                  src="/icon/search-blue.svg"
                  alt="#"
                  width={54}
                  height={54}
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSearch;
