import { getBlogCategory, getBlogs, getSingleBlog } from "@/actions/actions";
import Comment from "@/components/blog/Comment";
import Container from "@/components/shared/Container";
import MoreBlogCard from "@/components/shared/MoreBlogCard";
import dayjs from "dayjs";
import Image from "next/image";

export const generateMetadata = async ({ params: { slug } }) => {
  const { data: blog } = await getSingleBlog(slug);
  return {
    title: blog?.blog_title,
    description: blog?.blog_content,
  };
};

const page = async ({ params: { slug } }) => {
  const { data: blog } = await getSingleBlog(slug);
  const { data: blogCategories } = await getBlogCategory();
  const { data: blogs } = await getBlogs(1, 4);
  const { id, blog_title, blog_content, blog_thumb_img, created_at, category } =
    blog || {};

  return (
    <section className="my-12">
      <Container>
        <div className="w-full h-[250px] lg:h-[600px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${blog_thumb_img}`}
            alt="#"
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="mt-4 lg:mt-12 grid lg:grid-cols-[1fr_350px] gap-12">
          {/* ----------------------blog-description--------------- */}
          <div>
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center gap-[6px]">
                <Image src="/icon/stack.svg" alt="#" width={24} height={24} />
                <p className="text-sm text-[#475156]">{category?.name}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Image
                  src="/icon/calender.svg"
                  alt="#"
                  width={24}
                  height={24}
                />
                <p className="text-sm text-[#475156]">
                  {dayjs(created_at).format("DD MMM, YYYY")}
                </p>
              </div>
              {/* <div className="flex items-center gap-[6px]">
                <Image
                  src="/icon/user-circle.svg"
                  alt="#"
                  width={24}
                  height={24}
                />
                <p className="text-sm text-[#475156]">Marvin McKinney</p>
              </div> */}
            </div>
            <h1 className="text-xl lg:text-[32px] font-semibold mt-4">
              {blog_title}
            </h1>
            {/*  <div className="hidden lg:flex justify-between items-center gap-5 mt-6">
              <div className="flex items-center gap-[6px]">
                <Image src="/icon/user.svg" alt="#" width={40} height={40} />
                <p className="font-medium">Cameron Williamson</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/whatsapp.svg"
                  alt="#"
                  width={40}
                  height={40}
                />
                <Image
                  src="/icon/facebook.svg"
                  alt="#"
                  width={40}
                  height={40}
                />
                <Image src="/icon/twitter.svg" alt="#" width={40} height={40} />
                <Image
                  src="/icon/linkedin.svg"
                  alt="#"
                  width={40}
                  height={40}
                />
                <Image
                  src="/icon/pinterest.svg"
                  alt="#"
                  width={40}
                  height={40}
                />
                <Image src="/icon/link.svg" alt="#" width={40} height={40} />
              </div>
            </div> */}
            <div
              dangerouslySetInnerHTML={{ __html: blog_content }}
              className="text-[#475156] mt-8 prose max-w-none"
            ></div>

            <Comment id={id} />
          </div>
          {/* ----------------------side-filter--------------- */}
          <div className="h-max sticky top-8">
            {/* --------------------search-------------------- */}
            <div className="border border-border p-6 rounded-md">
              <p className="font-medium">SEARCH</p>
              <div className="relative w-full h-11 mt-6">
                <input
                  type="text"
                  className="form-input focus:ring-0 focus:border-skyBlue h-full w-full border border-border rounded-sm text-sm px-4"
                  placeholder="Search for anything..."
                />
                <Image
                  src="/icon/search.svg"
                  alt="#"
                  width={20}
                  height={20}
                  className="absolute right-0 top-0 my-3 mr-4"
                />
              </div>
            </div>
            {/* --------------------category------------------- */}
            <div className="border border-border p-6 rounded-md mt-6">
              <p className="font-medium">CATEGORY</p>
              <div className="mt-4 space-y-3">
                {blogCategories?.map((item) => (
                  <label
                    key={item.id}
                    className="text-sm text-[#475156] flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="category"
                      className="form-radio border-border text-skyBlue focus:ring-0"
                      value={item.name}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>
            {/* --------------------more-blog------------------- */}
            <div className="border border-border p-6 rounded-md mt-6">
              <p className="font-medium">MORE BLOGS</p>
              <div className="mt-6 space-y-6">
                {blogs
                  ?.filter((item) => item.slug != slug)
                  ?.slice(0, 3)
                  ?.map((item) => (
                    <MoreBlogCard
                      key={item.id}
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.blog_thumb_img}`}
                      title={item.blog_title}
                      date={item.created_at}
                      slug={item.slug}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default page;
