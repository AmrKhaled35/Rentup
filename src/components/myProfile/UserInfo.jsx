"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { updateUser } from "@/actions/actions";

const UserInfo = ({ user }) => {
  const { phone, user_img, country, status } = user || {};
  const [fullName, setFullName] = useState(user?.name);
  const [image, setImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [newPass, setNewPass] = useState("");
  const [newPassCon, setNewPassCon] = useState("");

  const handleImgName = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("status", status);
    if (image) formData.append("user_img", image);
    const res = await updateUser(formData);
    if (res.status === "success") toast.success("تم التحديث بنجاح!");
  };

  const handlePhone = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    formData.append("phone", phoneNumber);
    const res = await updateUser(formData);
    if (res.status === "success") toast.success("تم التحديث بنجاح!");
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (newPass !== newPassCon) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }
    const formData = new FormData();
    formData.append("status", status);
    formData.append("password", newPass);
    const res = await updateUser(formData);
    if (res.status === "success") toast.success("تم التحديث بنجاح!");
  };

  return (
    <div className="flex flex-col gap-[30px] xl:w-4/5">
      {/* ملف التعريف */}
      <p className="text-xl font-semibold mb-[27px]">ملفي الشخصي</p>
      <div className="w-full flex justify-center relative mb-[35px]">
        <div className="w-[99px] h-[99px] rounded-full border-[3px] border-[#00B140] relative">
          {user_img ? (
            <Image
              src={image ? URL.createObjectURL(image) : `${process.env.NEXT_PUBLIC_IMG_URL}/${user_img}`}
              alt="user image"
              fill
              className="rounded-full"
            />
          ) : (
            <Image
              src={image ? URL.createObjectURL(image) : "/icon/user-circle.svg"}
              alt="user"
              fill
              objectFit="cover"
              className="rounded-full"
            />
          )}
          <label htmlFor="Uimg">
            <input
              type="file"
              className="hidden"
              id="Uimg"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="absolute h-[30px] w-[30px] flex justify-center items-center rounded-full right-0 bottom-0 cursor-pointer">
              <Image src="/icon/camera.svg" alt="#" width={30} height={30} />
            </div>
          </label>
        </div>
      </div>

      {/* الاسم */}
      <div className="">
        <input
          type="text"
          className="w-full h-[52px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-[#787878] mb-[15px]"
          value={fullName}
          placeholder="الاسم الكامل"
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <button
          onClick={handleImgName}
          className="w-full h-[52px] px-5 bg-[#00B140] rounded-[10px] text-white font-medium"
        >
          حفظ التغييرات
        </button>
      </div>
      <div className="mt-16">
        <p className="text-xl font-semibold mb-[27px]">تفاصيل الاتصال</p>
        <div className="flex gap-[10px] justify-between items-center mb-[15px]">
          <div className="w-[35%] h-[67px] border border-solid border-[#E6E6EB] rounded-[10px] overflow-hidden relative">
            <div className="absolute left-0 top-0 text-dark text-[16px] font-[400] flex gap-[10px] justify-between h-full w-full px-[22px] py-[12px]">
              <div>
                <div className="text-[#787878]">الدولة</div>
                <div>{country?.phone_code}</div>
              </div>
            </div>
          </div>

          <input
            type="number"
            className="w-[62%] h-[67px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-dark text-[16px] font-[500] placeholder:text-dark"
            value={phoneNumber}
            placeholder="رقم الهاتف"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handlePhone}
          className="w-full h-[52px] px-5 bg-[#00B140] rounded-[10px] text-white font-medium"
        >
          حفظ التغييرات
        </button>
      </div>

      {/* تغيير كلمة المرور */}
      <div className="mt-16">
        <p className="text-xl font-semibold mb-[27px]">تغيير كلمة المرور</p>
        <div className="">
          <input
            type="password"
            className="w-full h-[52px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-[#787878] text-[16px] font-[400] mb-[15px]"
            placeholder="كلمة المرور الحالية"
          />
          <input
            type="password"
            className="w-full h-[52px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-[#787878] text-[16px] font-[400] mb-[15px]"
            placeholder="كلمة المرور الجديدة"
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            className="w-full h-[52px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-[#787878] text-[16px] font-[400] mb-[15px]"
            placeholder="تأكيد كلمة المرور"
            onChange={(e) => setNewPassCon(e.target.value)}
          />
          <button
            onClick={handlePassword}
            className="w-full h-[52px] px-5 bg-[#00B140] rounded-[10px] text-white font-semibold"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
