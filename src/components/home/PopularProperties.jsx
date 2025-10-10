"use client";

import Link from "next/link";
import Container from "../shared/Container";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useTranslations } from "next-intl";

const PopularProperties = ({ data }) => {
  const { favIds } = useAuth();
  const [favourite, setFavourite] = useState(favIds);
  const t = useTranslations("sectionTitle");

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-16">
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">
            {t("All Properties")}
          </span>
          <Link
            href="/popular-properties"
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
              favorite={favourite?.includes(item?.id)}
              setFavorite={setFavourite}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularProperties;
