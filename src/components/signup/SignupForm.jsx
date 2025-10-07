"use client";

import myAxios from "@/utils/myAxios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
import { authKey, success } from "@/constant";

const SignupForm = ({ countries, cities }) => {
  const [state, setState] = useState("first");
  const [userType, setUserType] = useState(0);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [google_id, setGoogle_id] = useState(null);
  const [google, setGoogle] = useState(false);
  const { replace } = useRouter();
  const search = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let bodyData;
    if (!google) {
      bodyData = {
        ...data,
        user_type_id: userType,
        language_id: 1,
        phone: `${getValues("phone")}`,
        address: `${city?.city_name}, ${country?.country_name}`,
        status: 1,
      };
      myAxios
        .post("/users", bodyData)
        .then((res) => {
          if (res.data.status === success) {
            document.cookie = `${authKey}=${res?.data?.token}; path=/`;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "تم التسجيل بنجاح!",
              showConfirmButton: false,
              timer: 1500,
            });
            replace("/");
          }
        })
        .catch((err) => console.log(err));
    } else {
      bodyData = {
        ...data,
        name,
        email,
        google_id,
        user_type_id: userType,
        language_id: 1,
        phone: `${getValues("phone")}`,
        address: `${city?.city_name}, ${country?.country_name}`,
        is_verified: 0,
        is_google_connected: true,
        status: 1,
      };

      myAxios
        .post("/google-login/create-user", bodyData)
        .then((res) => {
          if (res.data.status === success) {
            document.cookie = `${authKey}=${res?.data?.token}; path=/`;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "تم التسجيل بنجاح!",
              showConfirmButton: false,
              timer: 1500,
            });
            replace("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredCities = cities?.filter(
    (item) => item?.country_id == watch("country_id")
  );

  const country = countries.find((item) => item.id === getValues("country_id"));
  const city = filteredCities?.find((item) => item.id == getValues("city_id"));

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenRes.access_token}` } }
        );
        if (res.status == 200) {
          setName(res?.data?.name);
          setEmail(res?.data?.email);
          setGoogle_id(res?.data?.sub);
          if (!search.has("google")) {
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
                } else {
                  setState("second");
                  setGoogle(true);
                }
              })
              .catch((err) => console.log(err));
          } else {
            setState("second");
            setGoogle(true);
          }
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
        {state === "first" ? (
          <>
            <h1 className="w-full text-center text-dark font-medium text-[30px] sm:text-[36px] mb-[40px]">
              سجل في موقع العقارات
            </h1>
            <button
              onClick={() => handleGoogleLogin()}
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
              <div>المتابعة عبر جوجل</div>
            </button>
            <div className="flex items-center my-6">
              <div className="flex-grow h-[1px] bg-gray55 rounded-lg"></div>
              <div className="text-grayA1 text-lg px-4">
                أو تابع عبر البريد الإلكتروني
              </div>
              <div className="flex-grow h-[1px] bg-gray55 rounded-lg"></div>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
              placeholder="الاسم الكامل"
              required
            />
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
              placeholder="البريد الإلكتروني"
            />
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              minLength={8}
              className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
              placeholder="كلمة المرور"
            />
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-red-500">
                يجب أن تكون كلمة المرور 8 أحرف على الأقل
              </span>
            )}
            <button
              onClick={() => setState("second")}
              className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:opacity-60"
              disabled={!watch("name") || !watch("email") || !watch("password")}
            >
              إنشاء حسابي
            </button>
            <div className="w-full text-center text-dark text-lg mt-6">
              لديك حساب بالفعل؟
              <Link href="/login" className="cursor-pointer text-[#00B140]">
                {" "}
                تسجيل الدخول
              </Link>
            </div>
          </>
        ) : state === "second" ? (
          <>
            <select
              {...register("country_id", { required: true, valueAsNumber: true })}
              className="w-full h-12 px-5 border border-[#E6E6EB] rounded-[10px] text-gray8c text-lg mb-4 form-select focus:ring-0 focus:border-[#E6E6EB]"
              required
            >
              <option disabled selected>
                اختر الدولة
              </option>
              {countries?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.country_name}
                </option>
              ))}
            </select>
            <select
              {...register("city_id", { required: true, valueAsNumber: true })}
              className="w-full h-12 px-5 border border-[#E6E6EB] rounded-[10px] text-gray8c text-lg mb-4 form-select focus:ring-0 focus:border-[#E6E6EB]"
              disabled={!getValues("country_id")}
              required
            >
              <option disabled selected>
                اختر المدينة
              </option>
              {filteredCities?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.city_name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setState("third")}
              className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:opacity-60"
              disabled={!watch("city_id")}
            >
              متابعة
            </button>
          </>
        ) : state === "third" ? (
          <>
            <div className="w-full text-center text-dark font-[700] text-[30px] sm:text-[36px] mb-[40px]">
              نوع المستخدم
            </div>
            <div
              onClick={() => setUserType(3)}
              className={`py-[24px] px-[28px] border ${
                userType == 3 ? "border-[#00B140]" : "border-[#E6E6EB]"
              } border-solid rounded-[10px] mb-5 cursor-pointer`}
            >
              <div className="text-dark font-medium text-lg">مالك</div>
              <div className="text-gray8c ">حساب افتراضي للأفراد</div>
            </div>
            <div
              onClick={() => setUserType(2)}
              className={`py-[24px] px-[28px] border ${
                userType == 2 ? "border-[#00B140]" : "border-[#E6E6EB]"
              } rounded-[10px] mb-5 cursor-pointer`}
            >
              <div className="text-dark font-medium text-lg">وسيط</div>
              <div className="text-gray8c">لمن يقوم بالإعلانات المتكررة</div>
            </div>
            <div
              onClick={() => setUserType(1)}
              className={`py-[24px] px-[28px] border ${
                userType == 1 ? "border-[#00B140]" : "border-[#E6E6EB]"
              } rounded-[10px] mb-[20px] cursor-pointer`}
            >
              <div className="text-dark font-medium text-lg">شركة عقارية</div>
              <div className="text-gray8c">لمن يريد الإعلان عن الشركات</div>
            </div>
            <button
              onClick={() => setState("fourth")}
              className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:opacity-60"
              disabled={!userType}
            >
              متابعة
            </button>
          </>
        ) : state === "fourth" ? (
          <>
            <div className="w-full flex justify-center">
              <Image
                src="/icon/VerifyNumberImage.svg"
                alt="#"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-[250px] sm:w-[306px] mb-[50px]"
              />
            </div>
            <div className="w-full text-center text-dark font-bold text-[30px] sm:text-[36px] mb-4">
              أدخل رقم الهاتف
            </div>
            <div className="w-full text-center text-gray8c text-lg mb-[40px]">
              لحمايتك وحماية الآخرين، نحتاج منك التحقق من رقم هاتفك قبل
              المتابعة.
            </div>
            <div className="flex gap-[10px] justify-between items-center mb-4">
              <div className="w-[35%] h-[72px] sm:h-[80px] border border-[#E6E6EB] rounded-[10px] overflow-hidden relative">
                <div className="absolute left-0 top-0 text-dark text-[16px] sm:text-[20px] font-[400] flex gap-[10px] justify-between h-full w-full px-[22px] py-[12px]">
                  <div>
                    <div className="text-gray8c">الدولة</div>
                    {/* <div>{country?.phone_code}</div> */}
                    <div>970</div>
                  </div>
                </div>
              </div>
              <input
                {...register("phone", { required: true })}
                type="number"
                className="w-[62%] h-[72px] sm:h-[80px] px-5 border border-solid border-[#E6E6EB] rounded-[10px] text-dark text-[16px] sm:text-[20px] placeholder:text-gray3B"
                placeholder="رقم الهاتف"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:opacity-60"
              disabled={!watch("phone")}
            >
              إرسال
            </button>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default SignupForm;
