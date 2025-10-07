import { getUser } from "@/actions/actions";
import Flutterwave from "@/components/payment/Flutterwave";
import Paypal from "@/components/payment/Paypal";
import Razorpay from "@/components/payment/Razorpay";
import SslCommerz from "@/components/payment/SslCommerz";
import Stripe from "@/components/payment/Stripe";

export const metadata = {
  title: "Payment Confirm",
};

const page = async ({ params: { slug } }) => {
  const { data: user } = await getUser();
  const amount = slug[1];

  if (slug[0].toLowerCase() === "stripe") {
    return <Stripe amount={amount} slug={slug} />;
  }

  if (slug[0].toLowerCase() === "paypal") {
    return <Paypal amount={amount} slug={slug} />;
  }

  if (slug[0].toLowerCase() === "razorpay") {
    return <Razorpay amount={amount} slug={slug} />;
  }

  if (slug[0].toLowerCase() === "flutterwave") {
    return <Flutterwave amount={amount} slug={slug} user={user} />;
  }

  if (slug[0].toLowerCase() === "sslcommerz") {
    return <SslCommerz amount={amount} slug={slug} user={user} />;
  }

  return <div>page</div>;
};

export default page;
