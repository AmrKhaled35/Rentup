"use client";

import Link from "next/link";
import Container from "../shared/Container";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";

const FeaturedListings = ({ data }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const t = useTranslations("sectionTitle")

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, []);

  return (
    <section data-aos="fade-up" data-aos-duration="2000" className="pt-16">
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">{t("Featured Listings")}</span>
          <Link
            href="/featured-listings"
            className="text-green-500 text-sm font-medium"
          >
            {t("See All")}
          </Link>
        </p>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {data?.slice(0, 4).map((item) => (
            <PropertyCardVertical
              key={item.id}
              data={item}
              favorite={favorite?.includes(item?.id)}
              setFavorite={setFavorite}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedListings;
