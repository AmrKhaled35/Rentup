"use client";

import { paymentPaypal } from "@/actions/actions";
import TransactionTable from "@/components/paymentLog/TransactionTable";
import { authKey } from "@/constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Wallet = ({ user, transactions }) => {
  const token = Cookies.get(authKey);
  const params = useSearchParams();
  const PayerID = params.get("PayerID");
  const paymentId = params.get("paymentId");

  useEffect(() => {
    if (PayerID && paymentId && token) {
      (async () => {
        await paymentPaypal({
          PayerID,
          paymentId,
          user_id: user?.id,
        });
      })();
    }
  }, [PayerID, paymentId, token]);

  return (
    <div className="overflow-x-auto">
      <p className="text-xl font-semibold mb-7">معلومات المحفظة</p>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-[10px] shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)]">
          <p className="font-semibold">الرصيد</p>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold mt-4">
              {user?.wallet?.balance || 0}{" "}
              <span className="text-[10px]">credit</span>
            </p>
            <Link href="/deposite">
              <button className="px-6 py-2 text-sm text-white bg-green-500 font-medium rounded-md mt-5">
                شحن
              </button>
            </Link>
          </div>
        </div>
        <div className="p-6 bg-white rounded-[10px] shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)]">
          <p className="font-semibold">المصروف</p>
          <p className="text-3xl font-semibold mt-4">
            {user?.wallet?.expense || 0}{" "}
            <span className="text-[10px]">credit</span>
          </p>
        </div>
        <div className="p-6 bg-white rounded-[10px] shadow-[0_30px_50px_0px_rgba(143,144,188,0.15)]">
          <p className="font-semibold">آخر شحن</p>
          <p className="text-3xl font-semibold mt-4">
            {user?.wallet?.last_recharge || 0}{" "}
            <span className="text-[10px]">credit</span>
          </p>
        </div>
      </div>
      <p className="text-xl font-medium mt-20">سجل المدفوعات</p>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Wallet;
