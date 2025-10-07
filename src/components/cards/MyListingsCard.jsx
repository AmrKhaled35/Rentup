import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import BoostModal from "../myListings/BoostModal";
import { deleteProperty, unpublishProperty } from "@/actions/actions";
import { success } from "@/constant";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);

const MyListingsCard = ({ data, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenInsight, setIsOpenInsight] = useState(false);
  const [modalId, setModalId] = useState(null);
  const router = useRouter();

  const {
    id,
    property_title,
    address,
    price,
    created_at,
    get_title_image,
    get_advert_info,
    get_facility,
    status,
    is_featured,
  } = data || {};
  const { clicks, calls, favorites, messages } = get_advert_info || {};

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EA570",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteProperty(id);
        if (data?.status === success) {
          router.refresh();
          Swal.fire("Deleted!", "Your property has been deleted.", "success");
        }
      }
    });
  };

  const handleUnpublish = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EA570",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unpublish it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await unpublishProperty(id);
        if (data?.status === success) {
          Swal.fire(
            "Unpublished!",
            "Your property has been unpublished.",
            "success"
          );
        }
      }
    });
  };

  const handleBoostModal = (id) => {
    setModalId(id);
    setIsOpen(true);
  };
  const handleInsightModal = (id) => {
    setModalId(id);
    setIsOpenInsight(true);
  };

  return (
    <div className="p-4 rounded-[10px] grid xl:grid-cols-[295px_1fr] gap-4 lg:gap-8 bg-white shadow-[0_15px_30px_0px_rgba(143,144,188,0.15)]">
      <div className="h-[263px] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${get_title_image?.title_img}`}
          alt="#"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div>
        <p className="flex items-center gap-[10px]">
          <Image
            src="/icon/dot.svg"
            alt="#"
            width={0}
            height={0}
            sizes="100vw"
            className="size-[5px] lg:size-2"
          />
          <span className="text-xs text-gray55">
            {dayjs(created_at).fromNow()}
          </span>
        </p>
        <p className="text-lg lg:text-[22px] font-semibold leading-none lg:mt-[10px]">
          {property_title}
        </p>
        <p className="flex items-center gap-3 mt-2 lg:mt-3">
          <Image src="/icon/location-red.svg" alt="#" width={10} height={12} />
          <span className="text-xs">{address}</span>
        </p>
        <div className="flex justify-between items-center mt-3 lg:mt-4">
          <p className="text-lg font-semibold leading-none">
            <span className="text-golden">$ </span>
            {price}
          </p>
        </div>
        <hr className="mt-4 mb-5" />
        <div className="flex justify-between items-center">
          {get_facility?.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.f_icon}`}
                alt="#"
                width={18}
                height={10}
              />
              <p className="text-sm text-gray55 font-light">
                {item.f_value} {item.f_title}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[18px] grid grid-cols-2 md:grid-cols-4 gap-6">
          {status == "active" && (
            <button
              onClick={() => handleBoostModal(id)}
              className={`flex justify-center items-center gap-2 font-medium ${
                is_featured
                  ? "bg-green-500 border-green-500"
                  : "bg-[#FFAC30] border-[#FFAC30]"
              } text-white text-xs lg:text-sm rounded-full py-2 border`}
              disabled={is_featured}
            >
              <Image src="/icon/boost.svg" alt="#" width={12} height={18} />
              {is_featured ? "Featured" : "Feature"}
            </button>
          )}
          <Link
            href={`/update-property/${id}`}
            className="flex justify-center items-center font-medium bg-skyBlue/10 text-skyBlue text-xs lg:text-sm rounded-full py-2 border border-skyBlue"
          >
            Edit
          </Link>
          {status !== "unpublish" && status !== "pending" && (
            <button
              onClick={() => handleUnpublish(id)}
              className="flex justify-center items-center font-medium bg-skyBlue/10 border border-skyBlue text-skyBlue text-xs lg:text-sm rounded-full py-2"
            >
              Unpublish
            </button>
          )}
          <button
            onClick={() => handleDelete(id)}
            className="flex justify-center items-center gap-2 font-medium bg-skyBlue text-white text-xs lg:text-sm rounded-full py-2 border border-skyBlue"
          >
            Delete
          </button>
        </div>
        <div className="w-full grid grid-cols-4 gap-6 text-[#505050] text-xs  mt-[18px] mb-[4px] md:mb-0">
          <div className="bg-[#F1F1F1] rounded-[5px] flex gap-[10px] justify-center items-center p-[3px]">
            <Image src="/icon/LoveIcon.svg" alt="#" width={14} height={13} />
            <div>{favorites}</div>
          </div>
          <div className="bg-[#F1F1F1] rounded-[5px] flex gap-[10px] justify-center items-center p-[3px]">
            <Image src="/icon/PhoneIcon.svg" alt="#" width={13} height={13} />
            {calls}
          </div>
          <div className="bg-[#F1F1F1] rounded-[5px] flex gap-[10px] justify-center items-center p-[3px]">
            <Image src="/icon/MessageIcon.svg" alt="#" width={15} height={12} />
            {messages}
          </div>
          <div className="bg-[#F1F1F1] rounded-[5px] flex gap-[10px] justify-center items-center p-[3px]">
            <Image src="/icon/EyeIcon.svg" alt="#" width={18} height={8} />
            <div>{clicks}</div>
          </div>
        </div>
      </div>
      <BoostModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={modalId}
        data={data}
        token={token}
        // setRefetch={setRefetch}
      />
    </div>
  );
};

export default MyListingsCard;
