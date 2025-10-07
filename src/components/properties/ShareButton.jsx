"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ShareModal from "./ShareModal";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 px-5 py-2 rounded-[10px] border border-dark"
      >
        <Image src="/icon/share.svg" alt="#" width={13} height={17} />
        <span>مشاركة</span>
      </button>
      <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} url={currentUrl} />
    </>
  );
};

export default ShareButton;
