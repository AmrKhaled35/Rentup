"use client";

import Image from "next/image";
import React, { useState } from "react";

const Accordion = ({ data }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const {ans, qua} = data

  return (
    <div
      className={`py-7 px-6 border bg-white rounded-lg shadow-sm ${
        accordionOpen && "border-skyBlue"
      }`}
    >
      <button
        onClick={() => setAccordionOpen((p) => !p)}
        className="flex justify-between items-center w-full text-lg font-medium"
      >
        <span>{qua}</span>
        <span>
          <Image
            src="/icon/chevron-right.svg"
            alt=""
            width={30}
            height={30}
            className={`${accordionOpen ? "-rotate-90" : "rotate-90"} transition-all duration-300`}
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div
          className={`overflow-hidden ${
            accordionOpen ? "mt-3" : "mt-0"
          } transition-all duration-300`}
        >
          {ans}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
