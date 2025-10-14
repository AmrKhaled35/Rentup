"use client";

import Image from "next/image";
import Link from "next/link";

const AdBanner = ({ adImage = null, adLink = "#" }) => {
  if (adImage) {
    return (
      <div className="flex justify-center mt-16">
        <Link
          href={adLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src={adImage}
            alt="Advertisement"
            width={300}
            height={250}
            className="rounded-xl shadow-md hover:opacity-90 transition-all duration-300 object-cover w-[300px] h-[250px]"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-green-400 rounded-xl mt-16 p-4 bg-blue-50 hover:bg-blue-100 transition-all duration-300 shadow-sm w-[300px] h-[250px] mx-auto">
      <h3 className="text-xl font-semibold text-green-700 mb-3">
        احجز مساحتك الإعلانية هنا
      </h3>
      <Link
        href="/contact"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-all duration-200"
      >
        تواصل الآن
      </Link>
    </div>
  );
};

export default AdBanner;
