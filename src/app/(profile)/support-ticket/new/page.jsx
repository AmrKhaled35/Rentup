"use client";

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewPage = () => {
  const [files, setFiles] = useState([]);
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  const token = Cookies.get(authKey);

  const onSubmit = (data) => {
    const formData = new FormData();
    files?.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });
    formData.append("subject", data.subject);
    formData.append("priority", data.priority);
    formData.append("message", data.message);

    myAxios
      .post("/customer/tickets", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("تم إنشاء التذكرة بنجاح!");
          push(`/support-ticket/${res.data.data.ticket?.id}`);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 shadow-sm rounded-md h-max"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-medium">الموضوع</p>
          <input
            {...register("subject")}
            type="text"
            className="w-full h-11 px-5 mt-3 border border-[#E6E6EB] rounded-lg focus:ring-0 focus:border-[#E6E6EB] form-input"
            required
          />
        </div>
        <div>
          <p className="font-medium">الأولوية</p>
          <select
            {...register("priority", { required: true })}
            className="h-11 w-full rounded-lg border-[#E6E6EB] focus:ring-0 focus:border-[#E6E6EB] text-grayA6 form-select mt-3 text-sm"
            required
          >
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-medium">الرسالة</p>
        <textarea
          {...register("message")}
          className="w-full h-40 px-5 py-2 mt-3 border border-[#E6E6EB] rounded-lg resize-none focus:ring-0 focus:border-[#E6E6EB] form-textarea"
          required
        />
      </div>
      <div className="mt-5">
        <p className="font-medium">المرفقات</p>
        <input
          onChange={(e) => setFiles([...e.target.files])}
          type="file"
          multiple
          className="w-full text-sm text-grayA6 border border-[#E6E6EB] rounded-lg cursor-pointer mt-3 file:mr-4 file:h-11 file:px-4 file:border-0 file:text-sm file:bg-slate-100"
        />
      </div>
      <button
        type="submit"
        className="mt-7 py-2 w-full bg-green-500 text-white font-medium rounded-lg"
      >
        إرسال
      </button>
    </form>
  );
};

export default NewPage;
