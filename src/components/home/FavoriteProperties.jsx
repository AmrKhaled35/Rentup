"use client";

import Link from "next/link";
import Container from "../shared/Container";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useTranslations } from "next-intl";

const FavoriteProperties = ({ data }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const t = useTranslations("sectionTitle");

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-16">
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">
            {t("Favorite Properties")}
          </span>
          <Link
            href="/favorite-properties"
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

export default FavoriteProperties;
