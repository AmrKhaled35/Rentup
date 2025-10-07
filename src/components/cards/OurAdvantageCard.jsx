import Image from "next/image";

const OurAdvantageCard = ({ src, title, des }) => {
  return (
    <div className="p-5">
      <Image src={src} alt="#" width={54} height={54}  className="text-[#00B140]"/>
      <p className="mt-4 text-[28px] font-bold">{title}</p>
      <p className="mt-4 text-gray8c">{des}</p>
    </div>
  );
};

export default OurAdvantageCard;
