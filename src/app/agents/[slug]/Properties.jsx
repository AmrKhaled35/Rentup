"use client";

import PropertyCardVertical from "@/components/cards/PropertyCardVertical";
import RSPagination from "@/components/shared/RSPagination";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Properties = ({ data, paginationInfo }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);

  return (
    <>
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
    </>
  );
};

export default Properties;
