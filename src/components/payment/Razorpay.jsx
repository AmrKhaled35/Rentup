/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { paymentRazorpay } from "@/actions/actions";
import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";

const Razorpay = ({ amount, slug }) => {
  const [Razorpay, isLoaded] = useRazorpay();
  const [order, setOrder] = useState(null);
  const [key, setKey] = useState(null);
  const token = Cookies.get(authKey);
  const { push } = useRouter();

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(() => {
        myAxios
          .post(
            "/customer/razorpay/payment",
            { amount, currency: slug[2] },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => setOrder(res.data.data))
          .catch((err) => console.log(err));

        myAxios("/customer/gateway/razorpay", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) =>
            setKey(JSON.parse(res.data.data.gateway_parameters).RAZORPAY_KEY)
          )
          .catch((err) => console.log(err));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  const handlePayment = () => {
    const options = {
      key: key,
      amount,
      currency: slug[2],
      order_id: order?.id,
      handler: async (res) => {
        const data = await paymentRazorpay({
          order_id: res.razorpay_order_id,
          currency: slug[2],
          amount,
        });
        if (data.status === "success") {
          push("/wallet");
        }
      },
      theme: {
        color: "#00B140",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  useEffect(() => {
    if (isLoaded && order && key) {
      handlePayment();
    }
  }, [isLoaded, handlePayment, order, key]);

  return (
    <div className="h-max flex justify-center items-center bg-white py-10 rounded-lg shadow-md text-[#00B140] font-medium">
      جاري التحويل إلى Razorpay...
    </div>
  );
};

export default Razorpay;
