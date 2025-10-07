"use client";

import Link from "next/link";
import Container from "../shared/Container";
import PropertyCardHorizontal from "../cards/PropertyCardHorizontal";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import PropertyCardVertical from "../cards/PropertyCardVertical";

const RecentlyAdded = ({ data = [] }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const t = useTranslations("sectionTitle");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1500"
      className="mt-16 mb-[120px]"
    >
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">{t("Recently Added")}</span>
          <Link
            href="/recently-added"
            className="text-green-500 text-sm font-medium"
          >
            {t("See All")}
          </Link>
        </p>
        <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-8">
          {data
            ?.slice(0, 6)
            .map((item) =>
              isMobile ? (
                <PropertyCardVertical
                  key={item.id}
                  data={item}
                  favorite={favorite?.includes(item?.id)}
                  setFavorite={setFavorite}
                />
              ) : (
                <PropertyCardHorizontal
                  key={item.id}
                  data={item}
                  favorite={favorite?.includes(item?.id)}
                  setFavorite={setFavorite}
                />
              )
            )}
        </div>
      </Container>
    </section>
  );
};

export default RecentlyAdded;
