"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Deposit = ({ gateways }) => {
  const [selectedGateway, setSelectedGateway] = useState("");
  const { push } = useRouter();
  const { currency } = useAuth();

  const currencies = gateways.find(
    (item) => item.gateway_name === selectedGateway
  );
  const currencyOption =
    currencies && Object.keys(JSON.parse(currencies?.supported_currencies));

  const handleSubmit = (e) => {
    e.preventDefault();
    const gateway = e.target.gateway.value;
    const currency = e.target.currency.value;
    const amount = e.target.amount.value;

    if (!gateway || !currency || !amount) {
      return toast.error("من فضلك أدخل جميع المعلومات");
    }

    push(`/deposite/${gateway}/${amount}/${currency}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="bg-white rounded-[10px] px-8 py-10 shadow border border-[#E4E7E9]">
        <div className="mt-10">
          <label className="text-sm font-medium block">اختر بوابة الدفع</label>
          <select
            name="gateway"
            className="form-select focus:ring-0 border-gray-300 focus:border-gray-300 mt-3 rounded-md w-full"
            onChange={(e) => setSelectedGateway(e.target.value)}
            required
          >
            <option value="">اختر واحدة</option>
            {gateways.map((item) => (
              <option key={item.id} value={item.gateway_name}>
                {item.gateway_name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-6 w-full bg-green-500 text-white text-lg font-medium py-2 rounded-md"
          >
            تأكيد
          </button>
        </div>
      </div>
      <div className="bg-white rounded-[10px] px-6 py-8 shadow border border-[#E4E7E9]">
        <p className="text-xl font-medium text-gray-800 text-center">
          اختيارك
        </p>
        <div className="mt-6">
          <label className="text-sm font-medium block">اختر العملة</label>
          <select
            name="currency"
            className="form-select focus:ring-0 border-gray-300 focus:border-gray-300 mt-3 rounded-md w-full"
            disabled={!selectedGateway}
            required
          >
            <option value="">اختر واحدة</option>
            {currencyOption?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label className="text-sm font-medium block">أدخل المبلغ</label>
          <input
            name="amount"
            type="text"
            className="w-full h-10 mt-1 form-input focus:ring-0 focus:border-gray-300 border-gray-300 rounded-md"
            placeholder="0"
            required
          />
        </div>
        <p className="mt-6">
          سعر التحويل 1 دولار = {currency?.value} {currency?.currency_code}
        </p>
      </div>
    </form>
  );
};

export default Deposit;
