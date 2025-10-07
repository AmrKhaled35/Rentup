"use client";

import Slider from "react-slick";
import { useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";

const MySliderNoGap = ({ children, slidesToShow, title }) => {
  const slider = useRef(null);
  return (
    <section className="mt-24">
      <Container>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">{title}</p>
          <Link href="/" className="flex items-center gap-2">
            <p className="text-sm text-skyBlue font-semibold">
              Browse All Product
            </p>
            <Image
              src="/icon/right-arrow-blue.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className="mt-10">
          <div className="relative">
            <Slider
              ref={slider}
              slidesToShow={slidesToShow}
              slidesToScroll={1}
              swipeToSlide={true}
              infinite={true}
              speed={500}
              className="px-3 "
            >
              {children}
            </Slider>
            <Image
              src="/icon/arrow-button.svg"
              alt="prev"
              width={48}
              height={48}
              className="absolute -left-3 rotate-180 top-[91px]"
              onClick={() => slider?.current?.slickPrev()}
            />
            <Image
              src="/icon/arrow-button.svg"
              alt="prev"
              width={48}
              height={48}
              className="absolute -right-3 top-[91px]"
              onClick={() => slider?.current?.slickNext()}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MySliderNoGap;
