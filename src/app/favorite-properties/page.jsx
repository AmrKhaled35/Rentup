import { getFavorite } from "@/actions/actions";
import FavoriteProperties from "@/components/favoriteProperties/FavoriteProperties";

export const metadata = {
  title: "Favorite Properties",
};

const page = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getFavorite(page);

  return <FavoriteProperties data={data} paginationInfo={paginationInfo} />;
};

export default page;
