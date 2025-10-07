"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "./NextJsImage";

const Gallery = ({ images, title_image }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const transformedImages = images?.map((image) => ({
    src: `${process.env.NEXT_PUBLIC_IMG_URL}${image.img}`,
  }));

  return (
    <>
      <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-8">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${title_image?.title_img}`}
          alt="#"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[225px] md:h-[520px] object-cover rounded-[10px]"
        />
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-7">
          <Image
            src={transformedImages[0]?.src}
            alt="#"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-[225px] md:h-[245px] object-cover rounded-[10px]"
          />
          <div className="relative w-full h-[225px] md:h-[245px]">
            <Image
              src={transformedImages[1]?.src}
              alt="#"
              fill
              className="object-cover rounded-[10px]"
            />
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="text-sm font-medium px-6 py-3 bg-white/90 rounded-[10px] absolute md:right-6 right-3 md:bottom-6 bottom-3"
            >
              عرض جميع الصور
            </button>
          </div>
        </div>
      </div>
      <Lightbox
        open={isGalleryOpen}
        close={() => setIsGalleryOpen(false)}
        slides={transformedImages}
        render={{ slide: NextJsImage }}
      />
    </>
  );
};

export default Gallery;
