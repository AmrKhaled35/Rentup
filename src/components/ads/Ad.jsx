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
            width={1200}
            height={250}
            className="rounded-xl shadow-md hover:opacity-90 transition-all duration-300 object-cover w-full"
          />
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-green-400 rounded-xl mt-16 p-6 bg-blue-50 hover:bg-blue-100 transition-all duration-300 shadow-sm">
      <h3 className="text-2xl font-semibold text-green-700 mb-3">
        احجز مساحتك الإعلانية هنا
      </h3>
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-all duration-200">
        تواصل الآن
        {/* <span className="text-lg">🖱️</span> */}
      </button>
    </div>
  );
};

export default AdBanner;
