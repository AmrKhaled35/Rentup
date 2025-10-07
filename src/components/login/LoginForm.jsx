"use client";

import myAxios from "@/utils/myAxios";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordForgotModal from "./PasswordForgotModal";
import Swal from "sweetalert2";
import { loginUser } from "@/actions/actions";
import toast from "react-hot-toast";
import { authKey, success } from "@/constant";

import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { push, replace } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const data = await loginUser(values);
    if (data.status === success) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم تسجيل الدخول بنجاح!",
        showConfirmButton: false,
        timer: 1500,
      });
      replace("/");
    }
    if (data.status === "error") {
      setLoading(false);
      toast.error(data.message);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenRes.access_token}` } }
        );
        if (res.status == 200) {
          myAxios
            .post("/google-login/login", {
              email: res?.data?.email,
              google_id: res?.data?.sub,
            })
            .then((res) => {
              if (res.data.status === "success") {
                document.cookie = `${authKey}=${res?.data?.token}; path=/`;
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "تم تسجيل الدخول بنجاح!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                replace("/");
              } else if (res?.data?.status === "failed") {
                return push("/signup?google");
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[600px] rounded-[20px] px-0 sm:px-[50px] py-0 sm:py-[60px] shadow-none sm:shadow-[0_2px_17px_0_rgba(0,0,0,0.12)]"
      >
        <h1 className="w-full text-center text-dark font-medium text-[30px] sm:text-[36px] mb-[40px]">
          تسجيل الدخول
        </h1>
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full h-14 flex justify-center items-center text-gray55 text-lg py-3 border rounded-full relative"
        >
          <Image
            src="/icon/GoogleIcon.svg"
            alt="#"
            width={27}
            height={27}
            className="absolute left-[30px] rounded-full"
          />
          <div>تسجيل الدخول عبر جوجل</div>
        </button>
        <div className="flex items-center my-6">
          <div className="flex-grow h-[1px] bg-gray55 rounded-lg"></div>
          <div className="text-grayA1 text-lg px-4">أو تسجيل الدخول بالبريد الإلكتروني</div>
          <div className="flex-grow h-[1px] bg-gray55 rounded-lg"></div>
        </div>
        <input
          {...register("email")}
          type="email"
          name="email"
          className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
          placeholder="البريد الإلكتروني"
          required
        />
        <input
          {...register("password")}
          type="password"
          name="password"
          className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
          placeholder="كلمة المرور"
          required
        />
        <button
          type="submit"
          className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:bg-[#00B140]/50"
          disabled={loading}
        >
          تسجيل الدخول
        </button>
        <div className="w-full text-center text-dark font-medium text-xl mt-6 mb-4">
          هل نسيت كلمة المرور؟{" "}
          <span
            className="text-[#00B140] cursor-pointer text-lg font-normal"
            onClick={() => setIsOpen(true)}
          >
            إعادة تعيين كلمة المرور
          </span>
        </div>
        <div className="w-full text-center text-dark text-lg">
          لا تملك حسابًا؟
          <Link href="/signup" className="cursor-pointer text-[#00B140]">
            {" "}سجّل الآن
          </Link>
        </div>
      </form>

      <PasswordForgotModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default LoginForm;
