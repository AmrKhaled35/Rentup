"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import StripeCheckoutForm from "./StripeCheckoutForm";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { authKey } from "@/constant";

const Stripe = ({ amount, slug }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePK, setStripePK] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get(authKey);
  const stripePromise = stripePK && loadStripe(stripePK);

  useEffect(() => {
    if (token) {
      setLoading(true);
      myAxios
        .post(
          "/customer/stripe/payment-intent",
          { amount, currency: slug[2] },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setClientSecret(res.data?.clientSecret);
        })
        .catch((err) => console.log(err?.message));

      myAxios("/customer/gateway/stripe", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setStripePK(JSON.parse(res.data.data.gateway_parameters).STRIPR_KEY);
          setLoading(false);
        })
        .catch((err) => console.log(err?.message));
    }
  }, [amount, token]);

  return (
    <>
      {loading ? (
        <p>...تحميل</p>
      ) : (
        stripePromise &&
        clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm slug={slug} />
          </Elements>
        )
      )}
    </>
  );
};

export default Stripe;
