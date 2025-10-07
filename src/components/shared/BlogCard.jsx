import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ data = {} }) => {
  const { blog_title, blog_content, blog_thumb_img, created_at, slug } = data;

  return (
    <div className="p-4 border border-border rounded flex flex-col w-full font-rubik">
      <Link href={`/blogs/${slug}`}>
        <div className="h-[248px] w-full relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${blog_thumb_img}`}
            alt="#"
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="mt-7 flex justify-between items-center">
          <div className="flex items-center gap-[6px]">
            <Image src="/icon/calender.svg" alt="#" width={24} height={24} />
            <p className="text-sm text-[#475156]">
              {dayjs(created_at).format("DDMMM, YYYY")}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <Image src="/icon/user-circle.svg" alt="#" width={24} height={24} />
            <p className="text-sm text-[#475156]">Kristin</p>
          </div>
        </div>
        <p className="mt-[10px] text-lg font-medium line-clamp-2">
          {blog_title}
        </p>
        <div
          className="mt-3 text-gray8c line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog_content }}
        ></div>
      </Link>
    </div>
  );
};

export default BlogCard;
