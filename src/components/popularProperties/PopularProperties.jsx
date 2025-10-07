"use client";

import useAuth from "@/hooks/useAuth";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import Container from "../shared/Container";
import PageHeader from "../shared/PageHeader";
import RSPagination from "../shared/RSPagination";
import { useState } from "react";

const PopularProperties = ({ data, paginationInfo }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);

  return (
    <Container>
      <PageHeader
        src="/property/popular-properties.jpg"
        title="Popular Properties"
      />
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {data?.map((item) => (
          <PropertyCardVertical
            key={item.id}
            data={item}
            favorite={favorite?.includes(item?.id)}
            setFavorite={setFavorite}
          />
        ))}
      </div>
      <RSPagination total_pages={paginationInfo?.total_pages} />
    </Container>
  );
};

export default PopularProperties;
