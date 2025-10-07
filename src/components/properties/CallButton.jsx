import Image from "next/image";
import Link from "next/link";

const CallButton = ({ phone }) => {
  return (
    <Link
      href={`tel:${phone}`}
      className="col-span-2 bg-green-500 text-white text-sm font-medium py-3 rounded-md flex justify-center items-center gap-2"
    >
      <Image src="/icon/phone-white.svg" alt="" width={14} height={14} />
      <p>{phone}</p>
    </Link>
  );
};

export default CallButton;
