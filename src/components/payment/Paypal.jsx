"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Paypal = ({ amount, slug }) => {
  const token = Cookies.get(authKey);
  const { replace } = useRouter();
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleRedirect = (url) => {
    replace(url);
  };

  useEffect(() => {
    if (redirectUrl) {
      handleRedirect(redirectUrl);
    }
  }, [redirectUrl]);

  useEffect(() => {
    if (token.length > 0) {
      const timeoutId = setTimeout(() => {
        myAxios
          .post(
            "/customer/paypal/initiate-payment",
            { amount, currency: slug[2] },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            setRedirectUrl(res.data?.redirect_url);
          })
          .catch((err) => console.log(err));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  return (
    <div className="h-max flex justify-center items-center bg-white py-10 rounded-lg shadow-md">
      ...تحميل
    </div>
  );
};

export default Paypal;
