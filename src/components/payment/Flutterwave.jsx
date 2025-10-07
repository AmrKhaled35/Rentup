"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Flutterwave = ({ amount, slug, user }) => {
  const token = Cookies.get(authKey);
  const { replace } = useRouter();

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        myAxios
          .post("/flutterwave/initialize", {
            user_id: user.id,
            amount,
            currency: slug[2],
            email: user.email,
            phone: user.phone,
            name: user.name,
            customizations_title: "RealEstate",
            customizations_description: "Recharge Wallet",
          })
          .then((res) => {
            replace(res.data.data.link);
          })
          .catch((err) => console.log(err));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  return (
    <div className="h-max flex justify-center items-center bg-white py-10 rounded-lg shadow-md">
      جاري تحويلك إلى فلوترويف...
    </div>
  );
};

export default Flutterwave;
