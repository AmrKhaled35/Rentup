"use client"

import useAuth from "@/hooks/useAuth";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import { useEffect, useState } from "react";

const MoreProperties = ({ data }) => {
  const { favProperties } = useAuth();
  const fav = favProperties?.map((item) => item.id);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    setFavorite(fav);
  }, [favProperties]);

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {data?.slice(0, 4)?.map((item) => (
        <PropertyCardVertical
          key={item.id}
          data={item}
          favorite={favorite?.includes(item?.id)}
          setFavorite={setFavorite}
        />
      ))}
    </div>
  );
};

export default MoreProperties;
