"use client";

import PropertyCardHorizontal from "../cards/PropertyCardHorizontal";
import Container from "../shared/Container";
import PageHeader from "../shared/PageHeader";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import RSPagination from "../shared/RSPagination";
import PropertyCardVertical from "../cards/PropertyCardVertical";

const RecentlyAdded = ({ data, paginationInfo }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <Container>
      <PageHeader
        src="/property/popular-properties.jpg"
        title="Recent Properties"
      />
      <div className="my-12 grid grid-cols-1 xl:grid-cols-2 gap-8">
        {data?.map((item) =>
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
      <RSPagination total_pages={paginationInfo?.total_pages} />
    </Container>
  );
};

export default RecentlyAdded;
