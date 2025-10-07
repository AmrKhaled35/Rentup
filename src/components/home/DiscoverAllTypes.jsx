import Link from "next/link";
import Container from "../shared/Container";
import TypeCard from "../cards/TypeCard";
import { getTranslations } from "next-intl/server";

const DiscoverAllTypes = async ({ data = [] }) => {
  const t = await getTranslations("sectionTitle");

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-16">
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">{t("Discover All Types")}</span>
          <Link href="/categories" className="text-green-500 text-sm font-medium">
            {t("See Categories")}
          </Link>
        </p>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {data?.slice(0, 4).map((item) => (
            <TypeCard
              key={item.id}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.banner}`}
              title={item.category_name}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DiscoverAllTypes;
