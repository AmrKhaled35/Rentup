"use client";

import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideNav = ({ user }) => {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const t = useTranslations("sideNavmenu");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white md:border border-[#E6E6EB] md:rounded-xl p-4 -mx-3 md:mx-0 h-fit hidden lg:block">
      {mounted && <div className="text-lg font-semibold">{user?.name}</div>}
      <div className="border-t border-[#E1E1E1] mt-[10px] mb-[25px]"></div>
      <div className="font-medium space-y-5 hidden md:block">
        <Link
          href="/dashboard"
          className={`${
            path === "/dashboard" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Dashboard")}
        </Link>
        <Link
          href="/add-property"
          className={`${
            path === "/add-property" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Create Property")}
        </Link>
        <Link
          href="/my-properties"
          className={`${
            path === "/my-properties" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("My Properties")}
        </Link>
        <Link
          href="/profile-settings"
          className={`${
            path === "/profile-settings" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Profile Settings")}
        </Link>
        <Link
          href="/my-favorite-properties"
          className={`${
            path === "/my-favorite-properties" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Favorite Properties")}
        </Link>
        <Link
          href="/chats"
          className={`${
            path === "/chats" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Chats")}
        </Link>
        <Link
          href="/wallet"
          className={`${
            path === "/wallet" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Wallet")}
        </Link>
        <Link
          href="/payment-log"
          className={`${
            path === "/payment-log" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Purchase History")}
        </Link>
        <Link
          href="/support-ticket"
          className={`${
            path === "/support-ticket" && "text-green-500"
          } cursor-pointer block`}
        >
          {t("Support Ticket")}
        </Link>
        {mounted && user?.user_package?.package_name !== "Free" && (
          <div className="mt-5 border border-green-500 bg-green-100 rounded-md py-3 text-center text-green-500 text-sm font-medium">
            <p>Active Plan: {user?.user_package?.package_name}</p>
            <p>Expiration date</p>
            <p className="text-base font-bold mt-1">
              {dayjs(user?.user_package?.package_end_date).format(
                "DD-MMM-YYYY"
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
