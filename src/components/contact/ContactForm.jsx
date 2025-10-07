"use client";

import myAxios from "@/utils/myAxios";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const t = useTranslations("contact");

  const onSubmit = (data) => {
    const toastId = toast.loading("Loading...");
    myAxios
      .post("/contact-us-data", data)
      .then((res) => {
        if (res.data.status === "success") {
          reset();
          toast.dismiss(toastId);
          toast.success("Successfully submitted!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-14 grid lg:grid-cols-2 gap-8"
    >
      <div>
        <p className="text-xl font-medium">{t("First Name")}</p>
        <input
          {...register("first_name")}
          type="text"
          className="mt-4 w-full h-16 form-input border-gray-200 rounded-lg focus:ring-0"
          placeholder="Name"
          required
        />
      </div>
      <div>
        <p className="text-xl font-medium">{t("Last Name")}</p>
        <input
          {...register("last_name")}
          type="text"
          className="mt-4 w-full h-16 form-input border-gray-200 rounded-lg focus:ring-0"
          placeholder="Name"
          required
        />
      </div>
      <div>
        <p className="text-xl font-medium">{t("Subject")}</p>
        <input
          {...register("subject")}
          type="text"
          className="mt-4 w-full h-16 form-input border-gray-200 rounded-lg focus:ring-0"
          placeholder="Subject"
          required
        />
      </div>
      <div>
        <p className="text-xl font-medium">{t("Email Address")}</p>
        <input
          {...register("email")}
          type="email"
          className="mt-4 w-full h-16 form-input border-gray-200 rounded-lg focus:ring-0"
          placeholder="example@mail.com"
          required
        />
      </div>
      <div className="lg:col-span-2">
        <p className="text-xl font-medium">{t("Details")}</p>
        <textarea
          {...register("details")}
          className="mt-4 w-full h-40 form-input border-gray-200 rounded-lg focus:ring-0"
          placeholder="Message"
          required
        />
      </div>
      <div className="lg:col-span-2 text-center mt-12">
        <button
          type="submit"
          className="font-medium py-3 px-10 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
