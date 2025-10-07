import Image from "next/image";
import Link from "next/link";

const TypeCard = ({ src, title }) => {
  return (
    <Link href={`/filter/buy/all-city/${title.toLowerCase()}`}>
      <div className="relative h-[400px] rounded-[10px] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover rounded-[10px] hover:scale-110 transition-transform duration-300"
        />
        <p className="absolute left-1/2 -translate-x-1/2 top-12 uppercase text-lg font-medium text-dark29 px-5 py-[10px] bg-white/50 backdrop-blur-sm rounded tracking-[3.9px]">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default TypeCard;
