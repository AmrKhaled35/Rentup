"use client";

import myAxios from "@/utils/myAxios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPassword = ({ token }) => {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      token,
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.password_confirmation) {
      return toast.error("Password do not matched !");
    }
    if (data.newPassword?.length < 8) {
      return toast.error("Password must be 8 character !");
    }
    myAxios
      .post("/password/reset", data)
      .then((res) => {
        if (res.data.status === "Your password has been reset.") {
          toast.success(res.data.status);
          push("/login");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[600px] rounded-[20px] px-0 sm:px-[50px] py-0 sm:py-[60px] shadow-none sm:shadow-[0_2px_17px_0_rgba(0,0,0,0.12)]"
    >
      <h1 className="w-full text-center text-dark font-medium text-[30px] sm:text-[36px] mb-[40px]">
        Reset Password
      </h1>
      <input
        {...register("email")}
        type="email"
        className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
        placeholder="Email address"
        required
      />
      <input
        {...register("password")}
        type="password"
        className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
        placeholder="new Password"
        required
      />
      <input
        {...register("password_confirmation")}
        type="password"
        className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
        placeholder="confirm Password"
        required
      />
      <button
        type="submit"
        className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-skyBlue text-xl font-semibold"
      >
        Reset
      </button>
    </form>
  );
};

export default ForgotPassword;
