import Image from "next/image";

const NotFound = ({ message }) => {
  return (
    <div className="size-full flex flex-col items-center mt-10">
      <Image
        src="/icon/notfound.svg"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="h-[170px] w-auto"
      />
      <p className="mt-6 text-xs text-[#6D727F]">{message}</p>
    </div>
  );
};

export default NotFound;
