"use client";

import Slider from "react-slick";
import { useRef } from "react";
import Image from "next/image";

const MySlider = ({ children, slidesToShow }) => {
  const slider = useRef(null);
  return (
    <div className="relative">
      <Slider
        ref={slider}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        swipeToSlide={true}
        infinite={true}
        speed={500}
      >
        {children}
      </Slider>
      <Image
        src="/icon/arrow-button.svg"
        alt="prev"
        width={48}
        height={48}
        className="absolute -left-2 rotate-180 top-[91px]"
        onClick={() => slider?.current?.slickPrev()}
      />
      <Image
        src="/icon/arrow-button.svg"
        alt="prev"
        width={48}
        height={48}
        className="absolute -right-2 top-[91px]"
        onClick={() => slider?.current?.slickNext()}
      />
    </div>
  );
};

export default MySlider;
