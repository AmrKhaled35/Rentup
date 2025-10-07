import Image from "next/image";
import Link from "next/link";

const ChattingList = ({ id, data }) => {
  const { id: property_id, property } = data || {};
  const { property_title, get_title_image, get_property_user } = property || {};

  return (
    <Link href={`/chats/${property_id}`} className="block">
      <div
        className={`${
          id == property_id
            ? "bg-skyBlue/10 border border-skyBlue"
            : "bg-[#F8F6F1]"
        } rounded-2xl p-3 grid grid-cols-[70px_1fr] gap-6`}
      >
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${get_title_image?.title_img}`}
            alt="image"
            width={70}
            height={70}
            className="rounded-xl object-cover h-[65px]"
          />
          <Image
            src={
              get_property_user?.user_img
                ? `${process.env.NEXT_PUBLIC_IMG_URL}/${get_property_user?.user_img}`
                : "/avatar.png"
            }
            alt=""
            width={27}
            height={27}
            className="absolute -right-2 -bottom-1 rounded-full"
          />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm !text-[#444] font-bold">
            {get_property_user?.name}
          </p>
          <p className="!text-[#444] font-bold truncate">{property_title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChattingList;
