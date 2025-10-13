"use client";

import Slider from "react-slick";
import { useRef } from "react";
import Image from "next/image";
import TestimonialCard from "../cards/TestimonialCard";

const options = {
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  infinite: true,
  speed: 500,
  dots: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TestimonialSlider = ({ testimonialData }) => {
  const slider = useRef(null);

  const translations = [
    {
      title: "لا أحد يعرف بورتلاند وشبه الجزيرة أفضل من ديفيد.",
      message:
        "كان لديّ أنا وزوجتي حلم بتقليص حجم منزلنا في كيب إليزابيث إلى شقة صغيرة أقرب إلى مكان عملنا وترفيهنا في بورتلاند.",
      reviewer_name: "ألفريدو دونين",
      reviewer_designation: "مصمم واجهات UI",
    },
    {
      title: "هو يضع دائمًا مصلحة عملائه في المقدمة",
      message:
        "بعد أن عملت مع ديفيد لبيع منزلي في عام 2013، اقتنعت أنه الوكيل العقاري الوحيد الذي سأحتاجه على الإطلاق. ومنذ ذلك الحين اشتريت عقارين…",
      reviewer_name: "ماكنه كورسغارد",
      reviewer_designation: "باحث UX",
    },
    {
      title: "تبيّن أنه بالضبط نوع المنزل الذي أردناه.",
      message:
        "نود أن نعبر عن شكرنا لجهودك الكبيرة في العثور على منزل مؤقت لنا، والذي تبيّن أنه تمامًا ما كنا نبحث عنه.",
      reviewer_name: "جيدون أمينوف",
      reviewer_designation: "مصمم UX",
    },
  ];

  const translatedTestimonials = testimonialData?.map((item, index) => ({
    ...item,
    title: translations[index]?.title || item.title,
    message: translations[index]?.message || item.message,
    reviewer_name: translations[index]?.reviewer_name || item.reviewer_name,
    reviewer_designation:
      translations[index]?.reviewer_designation || item.reviewer_designation,
  }));

  return (
    <div className="relative mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[26px] lg:text-5xl font-semibold">آراء الناس عنا</p>
        {/* <div className="flex gap-5 lg:gap-8">
          <Image
            src="/icon/right-arrow-circle.svg"
            alt="prev"
            width={0}
            height={0}
            sizes="100vw"
            className="rotate-180 size-8 lg:size-10 cursor-pointer"
            onClick={() => slider?.current?.slickPrev()}
          />
          <Image
            src="/icon/right-arrow-circle.svg"
            alt="next"
            width={0}
            height={0}
            sizes="100vw"
            className="size-8 lg:size-10 cursor-pointer"
            onClick={() => slider?.current?.slickNext()}
          />
        </div> */}
      </div>
      <Slider ref={slider} {...options} className="mt-8">
        {translatedTestimonials?.map((item) => (
          <div key={item.id} className="px-4">
            <TestimonialCard
              des={item.message}
              name={item.reviewer_name}
              prof={item.reviewer_designation}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.img}`}
              title={item.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
