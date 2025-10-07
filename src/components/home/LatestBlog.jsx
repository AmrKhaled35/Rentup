import Link from "next/link";
import BlogCard from "../shared/BlogCard";
import Container from "../shared/Container";
import { getTranslations } from "next-intl/server";

const LatestBlog = async ({ data }) => {
  const t = await getTranslations("sectionTitle")

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-[100px] lg:mt-[140px]">
      <Container>
        <p className="text-[32px] font-semibold text-center">{t("Latest Blog")}</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.slice(0, 3).map((blog) => (
            <BlogCard key={blog?.id} data={blog} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="text-xs lg:text-base text-white font-medium px-8 lg:px-12 py-3 lg:py-[18px] rounded-[10px] bg-skyBlue"
          >
            {t("See All")}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default LatestBlog;
