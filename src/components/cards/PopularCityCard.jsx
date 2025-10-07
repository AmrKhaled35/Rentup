import Image from "next/image";
import Link from "next/link";

const PopularCityCard = ({ src, title }) => {
  return (
    <Link href={`/filter/buy/${title.toLowerCase()}/all-category`}>
      <div className="relative h-[400px] rounded-[10px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${src}`}
          alt={title}
          fill
          className="object-cover rounded-[10px] hover:scale-110 transition-transform duration-300"
        />
        <p className="absolute left-1/2 -translate-x-1/2 top-12 uppercase text-2xl font-medium text-dark29 tracking-[4.8px]">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default PopularCityCard;
