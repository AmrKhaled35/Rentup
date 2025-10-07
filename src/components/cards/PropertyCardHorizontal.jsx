"use client";

import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authKey, success } from "@/constant";
import { adToFav, removeFromFav } from "@/actions/actions";
import Cookies from "js-cookie";

dayjs.extend(relativeTime);

const PropertyCardHorizontal = ({ data, favorite, setFavorite }) => {
  const { currency } = useAuth();
  const { push } = useRouter();
  const {
    id,
    get_title_image,
    get_property_user,
    price,
    created_at,
    address,
    property_title,
    get_facility,
  } = data;

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + " Million";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    } else {
      return number;
    }
  };

  const handleFavourite = async (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    const token = Cookies.get(authKey);
    if (!token) return push("/login");
    const data = await adToFav(id);
    if (data.status === success) {
      setFavorite((prev) => [...prev, id]);
      toast.success("Added to favourite");
    }
  };

  const handleDeleteFavourite = async (id, e) => {
    e.stopPropagation();
    const data = await removeFromFav(id);
    if (data.status === success) {
      setFavorite((prev) => prev.filter((item) => item != id));
      toast.success("Deleted from favourite");
    }
  };
  const handleRoute = (id) => {
    push(`/properties/${id}`);
  };

  return (
    <div
      onClick={() => handleRoute(id)}
      className="p-4 lg:px-5 lg:py-[19px] rounded-[10px] grid grid-cols-[130px_1fr] lg:grid-cols-[165px_1fr] gap-4 lg:gap-7 bg-white font-outfit shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)] cursor-pointer"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URL}${get_title_image?.title_img}`}
        alt="#"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover rounded-md"
      />
      <div>
        <p className="text-xl font-medium leading-none line-clamp-1">
          {property_title}
        </p>
        <p className="flex font-light items-center gap-[10px] mt-2 lg:mt-4">
          <Image src="/icon/location-red.svg" alt="#" width={9} height={14} />
          <span className="text-xs lg:text-sm leading-none">{address}</span>
        </p>
        <div className="flex justify-between items-center mt-3 lg:mt-[18px]">
          <p className="lg:text-lg font-semibold leading-none">
            <span className="text-golden">{currency?.currency_symbol} </span>
            {formatNumber(price)}
          </p>
          <p className="flex items-center gap-[10px]">
            <Image
              src="/icon/dot.svg"
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="size-[5px] lg:size-2"
            />
            <span className="text-xs lg:text-base text-gray55">
              {dayjs(created_at).fromNow()}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-[10px] lg:mt-4">
          <div className="flex items-center gap-4">
            <Image
              src={
                get_property_user?.user_img
                  ? `${process.env.NEXT_PUBLIC_IMG_URL}${get_property_user?.user_img}`
                  : "/avatar.png"
              }
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="size-5 lg:size-[25px] rounded-full object-cover"
            />
            <p className="text-sm lg:text-base">
              {get_property_user.name}
            </p>
          </div>
          {favorite ? (
            <Image
              onClick={(e) => handleDeleteFavourite(id, e)}
              src="/icon/heart-blue.svg"
              alt="#"
              width={18}
              height={15}
              className="cursor-default"
            />
          ) : (
            <Image
              onClick={(e) => handleFavourite(id, e)}
              src="/icon/heart-gray.svg"
              alt="#"
              width={18}
              height={15}
              className="cursor-default"
            />
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between items-center overflow-hidden">
          {get_facility?.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 whitespace-nowrap overflow-hidden"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.f_icon}`}
                alt="#"
                width={14}
                height={7}
              />
              <p className="text-xs lg:text-sm text-gray55 font-light">
                {item.f_value} {item.f_title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCardHorizontal;
