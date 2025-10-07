"use client";

import { useRouter } from "next/navigation";

const ChoosePlan = () => {
  const { push } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    push(`/deposite/${e.target.gateway.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-sm font-medium block">اختر طريقة الدفع</label>
      <select
        name="gateway"
        className="form-select focus:ring-0 border-gray-300 focus:border-gray-300 mt-3 rounded-md w-full"
        required
      >
        <option value="">اختر واحد</option>
        <option value="stripe">سترايب</option>
      </select>
      <button
        type="submit"
        className="mt-6 w-full bg-[#00B140] text-white text-lg font-medium py-2 rounded-md"
      >
        تأكيد
      </button>
    </form>
  );
};

export default ChoosePlan;
