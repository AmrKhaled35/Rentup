import Image from "next/image";

const PageHeader = ({ src, title }) => {
  return (
    <div className="mt-10 rounded-[10px] overflow-hidden h-60 relative">
      <Image src={src} alt="#" fill className="object-cover rounded-[10px]" />
      <div className="bg-black/30 absolute size-full flex justify-center items-center">
        <p className="text-5xl font-medium text-white text-center px-8 py-2 rounded-[10px] bg-black/35 backdrop-blur-[1.6px]">{title}</p>
      </div>
    </div>
  );
};

export default PageHeader;
