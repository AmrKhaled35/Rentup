import Image from "next/image";

const TestimonialCard = ({ title, des, src, name, prof }) => {
  return (
    <div className="border border-[#E4E7E9] bg-[#FEFEFE] rounded p-6 h-[350px] flex flex-col">
      <Image src="/icon/back-tick.svg" alt="#" width={42} height={34} />
      <p className="text-lg font-semibold mt-6">{title}</p>
      <p className="text-gray8c line-clamp-4 mt-4">{des}</p>
      <div className="mt-auto flex items-center gap-4">
        <Image
          src={src}
          alt="#"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="mt-1 text-xs text-[#767676]">{prof}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
