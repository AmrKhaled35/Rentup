import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { addToFeatured } from "@/actions/actions";
import { success } from "@/constant";

const BoostModal = ({ isOpen, setIsOpen, id, data }) => {
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const { property_title, property_description, get_title_image } = data || {};
  const handlePayment = async () => {
    setLoading(true);

    const data = await addToFeatured({ property_id: id, duration });
    setLoading(false);
    if (data.status === success) {
      setIsOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added To Featured!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]  my-10">
          <div className="fixed inset-0 bg-black opacity-60"></div>
          <div className="absolute h-max bg-white p-8 shadow-lg w-full max-w-[800px] rounded-xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <button
              className="absolute top-[10px] right-[10px] bg-[#F8F6F1] text-dark hover:bg-light-grey rounded-full p-[3px] sm:p-[5px]"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="/icon/boost-blue.svg"
                  alt=""
                  width={13}
                  height={20}
                />
                <p className="text-xl text-skyBlue font-medium">Boost</p>
              </div>
              <hr className="my-7" />
              <div className="flex items-center gap-7">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${get_title_image?.title_img}`}
                  alt=""
                  width={145}
                  height={100}
                  className="object-cover rounded-md h-[100px]"
                />
                <div className="flex flex-col gap-4">
                  <p className="text-xl text-dark font-semibold">
                    {property_title}
                  </p>
                  <p className="text-sm text-gray55 line-clamp-2">
                    {property_description}
                  </p>
                </div>
              </div>
              <div className="my-8 rounded-xl border">
                <div className="p-8">
                  <label className="block font-medium mb-2">Duration</label>
                  <input
                    onChange={(e) => setDuration(e.target.value)}
                    type="number"
                    className="w-full h-10 border border-[#E6E6EB] rounded-lg bg-[#F5F5F6] px-3 outline-none"
                    placeholder="7 days"
                  />
                  <button
                    onClick={handlePayment}
                    className="w-full py-2 bg-skyBlue text-white font-medium rounded-lg mt-6 disabled:opacity-50"
                    disabled={loading}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoostModal;
