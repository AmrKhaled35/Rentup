import { getPopular } from "@/actions/actions";
import PopularProperties from "@/components/popularProperties/PopularProperties";

const page = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getPopular(page);

  return <PopularProperties data={data} paginationInfo={paginationInfo} />;
};

export default page;
