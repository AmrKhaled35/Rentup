import { getRecentlyAdded } from "@/actions/actions";
import RecentlyAdded from "@/components/recentlyAdded/RecentlyAdded";

export const metadata = {
  title: "Recently Added Properties",
};

const page = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getRecentlyAdded(page);

  return <RecentlyAdded data={data} paginationInfo={paginationInfo} />;
};

export default page;
