"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { paymentStripe } from "@/actions/actions";

const StripeCheckoutForm = ({ slug }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const body = {
        transaction_id: paymentIntent.id,
        initiated: new Date(),
        payment_method: slug[0],
        amount: slug[1],
        conversion: slug[2],
        status: "success",
      };
      const res = await paymentStripe(body);
      if (res.status === "success") {
        push("/wallet");
      }
      setIsProcessing(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-sm flex flex-col gap-8 bg-white h-max px-6 py-10 rounded-[10px] shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)]"
      >
        <PaymentElement />
        <button
          type="submit"
          disabled={isProcessing}
          className="text-white bg-[#00B140] py-2 px-8 rounded-md disabled:opacity-40"
        >
          {isProcessing ? "جارٍ الدفع..." : "ادفع الآن"}
        </button>
      </form>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </>
  );
};

export default StripeCheckoutForm;
