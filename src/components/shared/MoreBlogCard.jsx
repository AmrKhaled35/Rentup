import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const MoreBlogCard = ({
  src,
  title = "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae. ",
  date = "28 Nov, 2015",
  slug,
}) => {
  return (
    <Link href={`/blogs/${slug}`} className="block">
      <div className="flex items-center gap-4">
        <Image
          src={src}
          alt="#"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[104px] h-20 object-cover rounded-sm"
        />
        <div className="py-[6px]">
          <p className="text-sm font-medium line-clamp-2">{title}</p>
          <p className="text-sm text-tGray mt-2">
            {dayjs(date).format("DD MMM, YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MoreBlogCard;
