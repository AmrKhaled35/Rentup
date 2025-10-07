import { getBlogs } from "@/actions/actions";
import BlogCard from "@/components/shared/BlogCard";
import Container from "@/components/shared/Container";
import RSPagination from "@/components/shared/RSPagination";

export const metadata = {
  title: "Blog",
};

const page = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getBlogs(page);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-10">
        {data.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
      <RSPagination total_pages={paginationInfo?.total_pages} />
    </Container>
  );
};

export default page;
