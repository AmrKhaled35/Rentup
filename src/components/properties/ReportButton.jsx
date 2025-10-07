"use client";

import { useState } from "react";
import ReportModal from "./ReportModal";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authKey } from "@/constant";

const ReportButton = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get(authKey);
  const router = useRouter();

  const handleModal = () => {
    if (!token) {
      router.push("/login");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleModal}
        className="text-[#00B140] px-5 py-3 rounded-md border border-[#00B140] text-sm font-medium"
      >
        الإبلاغ
      </button>
      <ReportModal
        id={id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        token={token}
      />
    </>
  );
};

export default ReportButton;
