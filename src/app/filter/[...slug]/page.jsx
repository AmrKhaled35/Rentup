import { getAdUnitIds, getCategories, getCities } from "@/actions/actions";
import FilterHome from "@/components/filter/FilterHome";
import Container from "@/components/shared/Container";

export const generateMetadata = async ({ params: { slug } }) => {
  const makeCapitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const category =
    slug[2] === "all-category" ? "Properties" : makeCapitalized(slug[2]);
  const listingType = `For ${makeCapitalized(slug[0])}`;
  const city = slug[1] == "all-city" ? "" : `Near ${makeCapitalized(slug[1])}`;
  const title = `${category} ${listingType} ${city}`;
  const description = `Find $${category} ${listingType} ${
    city && city
  } on RealEstate - Largest RealEstate site to buy and sell properties near you`;
  const robots = slug.length > 3 ? { index: false } : { index: true };

  return {
    title,
    description,
    robots,
  };
};

const page = async ({ params: { slug } }) => {
  const [{ data: cities }, { data: categories }, {data: adUnitIds}] = await Promise.all([
    getCities(),
    getCategories(),
    getAdUnitIds()
  ]);

  const cityOP = await cities?.map((item) => ({
    value: item.id,
    label: item.city_name,
  }));
  const categoryOP = await categories?.map((item) => ({
    value: item.id,
    label: item.category_name,
  }));

  return (
    <Container>
      <FilterHome
        slug={slug}
        categories={[{ value: 0, label: "جميع الفئات" }, ...categoryOP]}
        cities={[{ value: 0, label: "جميع المدن" }, ...cityOP]}
        adUnitIds={adUnitIds}
      />
    </Container>
  );
};

export default page;
