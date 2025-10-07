"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import PropertyCardVertical from "../cards/PropertyCardVertical";
import NotFound from "../shared/NotFound";

const MyFavoriteProperties = () => {
  const { favProperties, favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);

  return (
    <>
      {favProperties?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {favProperties?.map((item) => (
            <PropertyCardVertical
              key={item._id}
              data={item}
              favorite={favorite?.includes(item?.id)}
              setFavorite={setFavorite}
            />
          ))}
        </div>
      ) : (
        <div>
          <NotFound message="Properties Data Not Found" />
        </div>
      )}
    </>
  );
};

export default MyFavoriteProperties;
