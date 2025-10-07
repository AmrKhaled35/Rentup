import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import myAxios from "@/utils/myAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { adToFav, removeFromFav } from "@/actions/actions";
import { authKey, success } from "@/constant";
import Cookies from "js-cookie";
dayjs.extend(relativeTime);

const PropertyCardVertical = ({ data, favorite, setFavorite }) => {
  const { currency } = useAuth();
  const { push } = useRouter();
  const {
    id,
    property_title,
    price,
    address,
    get_property_user,
    created_at,
    get_title_image,
    get_gallery_image,
    get_facility,
  } = data || {};

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + " Million";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    } else {
      return number;
    }
  };

  const handleFavorite = async (id) => {
    const token = Cookies.get(authKey);
    if (!token) return push("/login");
    const data = await adToFav(id);
    if (data.status === success) {
      setFavorite((prev) => [...prev, id]);
      toast.success("Added to favorite");
    }
  };

  const handleDeleteFavorite = async (id) => {
    const data = await removeFromFav(id);
    if (data.status === success) {
      setFavorite((prev) => prev.filter((item) => item != id));
      toast.success("Deleted from favorite");
    }
  };

  return (
    <div className="bg-white font-outfit rounded-[10px] shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)] py-[6px] h-max">
      <div className="flex justify-between items-center px-3 py-[7px]">
        <div className="flex items-center gap-3">
          <Image
            src={
              get_property_user?.user_img
                ? `${process.env.NEXT_PUBLIC_IMG_URL}${get_property_user?.user_img}`
                : "/avatar.png"
            }
            alt="#"
            width={25}
            height={25}
            className="rounded-full size-[25px] object-cover"
          />
          <p className="text-sm font-bold">{get_property_user?.name}</p>
          <p className="flex items-center gap-[6px]">
            <Image src="/icon/dot.svg" alt="#" width={6} height={6} />
            <span className="text-sm text-gray55">
              {dayjs(created_at).fromNow()}
            </span>
          </p>
        </div>
        {favorite ? (
          <Image
            onClick={() => handleDeleteFavorite(id)}
            src="/icon/heart-blue.svg"
            alt="#"
            width={20}
            height={15}
          />
        ) : (
          <Image
            onClick={() => handleFavorite(id)}
            src="/icon/heart-gray.svg"
            alt="#"
            width={20}
            height={15}
          />
        )}
      </div>
      <Link
        href={`/properties/${id}`}
        onClick={() => myAxios.put(`/clicks/${id}`)}
      >
        <div className="my-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${get_title_image?.title_img}`}
            alt="#"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[200px] w-full object-cover"
          />
          <div className="grid grid-cols-[1fr_1fr_1fr_45px] gap-[3px] mt-[3px] overflow-hidden">
            {get_gallery_image?.slice(0, 3).map((item) => (
              <Image
                key={item.id}
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item?.img}`}
                alt="#"
                width={0}
                height={0}
                sizes="100vw"
                className="h-16 w-full object-cover"
              />
            ))}
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${get_gallery_image[3]?.img}`}
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="h-16 w-full object-cover blur-sm"
            />
          </div>
        </div>
        <div className="px-3 mt-4">
          <p className="text-xl font-medium truncate leading-none">
            {property_title}
          </p>
          <p className="text-lg font-semibold mt-3">
            <span className="text-golden">{currency?.currency_symbol} </span>
            {formatNumber(price)}
          </p>
          <p className="flex font-light items-center gap-[10px] mt-3 leading-none">
            <Image
              src="/icon/location-red.svg"
              alt="#"
              width={10}
              height={14}
            />
            <span className="text-sm truncate leading-none">{address}</span>
          </p>
          <hr className="mt-3 mb-1" />
          <div className="flex justify-between items-center flex-wrap gap-2 py-[6px]">
            {get_facility?.slice(0, 3)?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.f_icon}`}
                  alt="#"
                  width={14}
                  height={7}
                />
                <p className="text-sm text-gray55 font-light">
                  {item.f_value} {item.f_title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCardVertical;
