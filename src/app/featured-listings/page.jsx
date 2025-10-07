import { getFeatured } from "@/actions/actions";
import FeaturedListings from "@/components/featuredListings/FeaturedListings";

export const metadata = {
  title: "Featured Properties",
};

const FeaturedListingsPage = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getFeatured(page);

  return <FeaturedListings data={data} paginationInfo={paginationInfo} />;
};

export default FeaturedListingsPage;
