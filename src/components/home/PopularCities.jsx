"use client";
import { useState, useEffect } from "react";
import Container from "../shared/Container";
import { useTranslations } from "next-intl";

const PopularCities = ({ data }) => {
  const [activeCity, setActiveCity] = useState(null);
  const t = useTranslations("sectionTitle");

  useEffect(() => {
    if (data?.length > 0) setActiveCity(data[0].city_name);
  }, [data]);

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-16">
      <Container>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-medium text-black">
            {t("Popular Cities")}
          </span>
          <button className="text-green-500 text-sm font-medium hover:underline">
            {t("All Cities")}
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap justify-center items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 shadow-sm">
            {data?.slice(0, 8).map((item) => (
              <button
                key={item.city_name}
                onClick={() => setActiveCity(item.city_name)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  activeCity === item.city_name
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-black border-gray-300 hover:bg-green-100 hover:border-green-400"
                }`}
              >
                {item.city_name}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PopularCities;
