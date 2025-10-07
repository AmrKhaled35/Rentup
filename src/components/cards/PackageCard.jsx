"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { authKey } from "@/constant";
import { updateSubscription } from "@/actions/actions";

const PackageCard = ({ data, user }) => {
  const { id, title, package_advantage, property_count } = data;
  const [starterDuration, setStarterDuration] = useState(1);
  const [starterPrice, setStarterPrice] = useState(12);
  const [premiumDuration, setPremiumDuration] = useState(1);
  const [premiumPrice, setPremiumPrice] = useState(12);
  const { push } = useRouter();
  const token = Cookies.get(authKey);

  const handleClick = (title) => {
    if (!token) {
      return push("/login");
    }

    if (title === "Starter" && starterPrice > Number(user?.wallet?.balance)) {
      toast.error("You don,t have enough credit");
      return push("/wallet");
    }

    if (
      title === "Premium" &&
      Number(premiumPrice) > Number(user?.wallet?.balance)
    ) {
      toast.error("You don,t have enough credit");
      return push("/wallet");
    }

    let data;
    if (title === "Starter") {
      data = {
        package_id: id,
        duration: starterDuration,
        property_count,
        package_name: title,
        price: starterPrice,
        status: 1,
      };
    }
    if (title === "Premium") {
      data = {
        package_id: id,
        duration: premiumDuration,
        property_count,
        package_name: title,
        price: premiumPrice,
        status: 1,
      };
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EA570",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateSubscription(data);
        if (res.status === "success") {
          Swal.fire(
            "Activated!",
            "Your package has been activated.",
            "success"
          );
        }
      }
    });
  };

  const handleSelect = (title, duration, price) => {
    if (title === "Starter") {
      setStarterDuration(duration);
      setStarterPrice(price);
    }
    if (title === "Premium") {
      setPremiumDuration(duration);
      setPremiumPrice(price);
    }
  };

  return (
    <div
      className={`p-[30px] pt-6 rounded-[10px] border border-[#E4E7E9] drop-shadow-[0_8px_24px_0px_rgba(0,0,0,0.4)] relative 
      `}
      // ${
      //   title === "Premium" ? "border-t-0 rounded-t-none" : ""
      // }
    >
      {/* {title === "Premium" && (
        <p className="text-xl font-medium text-center py-3 bg-skyBlue text-white absolute left-0 right-0 bottom-full rounded-t-[10px] border-x border-x-skyBlue">
          RECOMMENDED
        </p>
      )} */}
      {/* <p className="text-xl font-medium">{title}</p> */}
      <p
        className={`text-center text-[28px] font-medium mt-6 ${
          title === "Premium" ? "bg-skyBlue/10 text-skyBlue" : "bg-[#F0F0F0]"
        }  rounded-md py-2`}
      >
        {title}
      </p>
      <div className="grid grid-cols-3 gap-4 mt-7">
        <button
          className={`border rounded-md py-2 text-center disabled:opacity-50 ${
            title === "Premium" && premiumDuration == 1
              ? "bg-skyBlue border-skyBlue text-white"
              : title === "Starter" && starterDuration == 1
              ? "bg-skyBlue border-skyBlue text-white"
              : ""
          }`}
          onClick={() => handleSelect(title, 1, 12)}
          disabled={title === "Free"}
        >
          <p className="text-sm">1 Month</p>
          <p className="text-xl font-medium">$12</p>
        </button>
        <button
          className={`border rounded-md py-2 text-center disabled:opacity-50 ${
            title === "Premium" && premiumDuration == 6
              ? "bg-skyBlue border-skyBlue text-white"
              : title === "Starter" && starterDuration == 6
              ? "bg-skyBlue border-skyBlue text-white"
              : ""
          }`}
          onClick={() => handleSelect(title, 6, 70)}
          disabled={title === "Free"}
        >
          <p className="text-sm">6 Month</p>
          <p className="text-xl font-medium">$70</p>
        </button>
        <button
          className={`border rounded-md py-2 text-center disabled:opacity-50 ${
            title === "Premium" && premiumDuration == 12
              ? "bg-skyBlue border-skyBlue text-white"
              : title === "Starter" && starterDuration == 12
              ? "bg-skyBlue border-skyBlue text-white"
              : ""
          }`}
          onClick={() => handleSelect(title, 12, 150)}
          disabled={title === "Free"}
        >
          <p className="text-sm">1 Year</p>
          <p className="text-xl font-medium">$150</p>
        </button>
      </div>
      <p className="mt-5 font-medium">Features of {title}</p>
      <div className="mt-3 space-y-3 text-gray8c">
        {package_advantage?.map((item) => (
          <PackageItem
            key={item.id}
            icon_type={item.icon_type}
            title={item.title}
          />
        ))}
      </div>
      <button
        onClick={() => handleClick(title)}
        className="mt-6 w-full border border-skyBlue rounded-md py-3 text-skyBlue text-xl font-medium disabled:opacity-50"
        disabled={
          title === user?.user_package?.package_name ||
          (user?.user_package?.package_name === "Starter" &&
            title === "Free") ||
          user?.user_package?.package_name === "Premium"
        }
      >
        {!user
          ? "Upgrade"
          : title === user?.user_package?.package_name
          ? "Current Plan"
          : user?.user_package?.package_name === "Starter" && title === "Free"
          ? "Not Available"
          : user?.user_package?.package_name === "Premium" && title === "Free"
          ? "Not Available"
          : user?.user_package?.package_name === "Premium" &&
            title === "Starter"
          ? "Not Available"
          : "Upgrade"}
      </button>
      {/* <SubscriptionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={modalId}
        data={data}
        token={token}
        logoutUser={logoutUser}
      /> */}
    </div>
  );
};

const PackageItem = ({ icon_type, title }) => {
  return (
    <p className="flex items-center gap-2">
      {icon_type !== "" && (
        <Image
          src={
            icon_type === "cross"
              ? "/icon/cross.svg"
              : icon_type === "check"
              ? "/icon/check.svg"
              : ""
          }
          alt=""
          width={16}
          height={16}
        />
      )}
      {title}
    </p>
  );
};

export default PackageCard;
