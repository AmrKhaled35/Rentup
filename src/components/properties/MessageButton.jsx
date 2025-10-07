"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MessageButton = ({ receiver_id, property_id, user }) => {
  const token = Cookies.get(authKey);
  const router = useRouter();

  const handleMessage = () => {
    if (token) {
      const toastId = toast.loading("جارٍ التحميل...");
      myAxios
        .post(
          "/customer/conversation-thread",
          {
            receiver_id,
            property_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            toast.dismiss(toastId);
            toast.success("تم بنجاح");
            router.push(`/chats/${res.data.data.id}`);
          }
        })
        .catch((err) => {
          toast.dismiss(toastId);
          console.log(err);
        });
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleMessage}
      className="border border-[#00B140] bg-[#00B140]/10 rounded-md py-3 px-5 flex items-center justify-center gap-2 w-full disabled:bg-red-100/50"
      disabled={user?.id == receiver_id}
    >
      <Image src="/icon/envelop-green.svg" alt="" width={12} height={10} />
      <p className="text-[#00B140] text-sm font-medium">رسالة</p>
    </button>
  );
};

export default MessageButton;
