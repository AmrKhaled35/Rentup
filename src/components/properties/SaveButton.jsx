"use client";

import { adToFav, removeFromFav } from "@/actions/actions";
import { authKey, success } from "@/constant";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SaveButton = ({ id }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const { push } = useRouter();
  const nId = Number(id);

  const handleFavourite = async (id) => {
    const token = Cookies.get(authKey);
    if (!token) return push("/login");
    const data = await adToFav(id);
    if (data.status === success) {
      setFavorite((prev) => [...prev, id]);
      toast.success("تم الإضافة للمفضلة");
    }
  };

  const handleDeleteFavourite = async (id) => {
    const data = await removeFromFav(id);
    if (data.status === success) {
      setFavorite((prev) => prev.filter((item) => item != id));
      toast.success("تم الحذف من المفضلة");
    }
  };

  return (
    <>
      {favorite?.includes(nId) ? (
        <button
          onClick={() => handleDeleteFavourite(nId)}
          className="flex items-center gap-4 px-5 py-2 rounded-[10px] border border-[#00B140] text-[#00B140] bg-[#00B140]/10"
        >
          <Image src="/icon/heart-green-2.svg" alt="#" width={15} height={14} />
          <span>حفظ</span>
        </button>
      ) : (
        <button
          onClick={() => handleFavourite(nId)}
          className="flex items-center gap-4 px-5 py-2 rounded-[10px] border border-dark"
        >
          <Image src="/icon/heart-dark.svg" alt="#" width={15} height={14} />
          <span>حفظ</span>
        </button>
      )}
    </>
  );
};

export default SaveButton;
