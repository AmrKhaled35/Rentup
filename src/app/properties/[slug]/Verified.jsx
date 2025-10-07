import Image from "next/image";
import React from "react";

const Verified = ({ imgL, title, imgR }) => {
  return (
    <div className="flex gap-2 bg-white rounded-md p-2 w-fit">
      <Image src={imgL} alt="" width={15} height={15} />
      <p className="text-sm text-[#444]">{title}</p>
      <Image src={imgR} alt="" width={12} height={10} />
    </div>
  );
};

export default Verified;