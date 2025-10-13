import { getCategories } from "@/actions/actions";
import TypeCard from "@/components/cards/TypeCard";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata = {
  title: "Category",
};

const page = async () => {
  const { data: categories } = await getCategories();

  return (
    <Container>
      <PageHeader src="/property/all-types.jpg" title="كل أنواع العقارات" />
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {categories?.map((item) => (
          <TypeCard
            key={item.id}
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.banner}`}
            title={item.category_name}
          />
        ))}
      </div>
    </Container>
  );
};

export default page;
