"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SslCommerz = ({ amount, slug, user }) => {
  const token = Cookies.get(authKey);
  const { replace } = useRouter();

  useEffect(() => {
    const body = {
      amount,
      currency: slug[2],
      customer_name: user?.name,
      customer_email: user?.email,
      customer_phone: user?.phone,
    };
    if (token) {
      const timeoutId = setTimeout(() => {
        myAxios
          .post("/customer/sslcommerz/pay", body, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => replace(res.data.data))
          .catch((err) => console.log(err));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  return (
    <div className="h-max flex justify-center items-center bg-white py-10 rounded-lg shadow-md text-[#00B140] font-medium">
      جاري التحويل إلى SslCommerz...
    </div>
  );
};

export default SslCommerz;
