import { getUserProperty } from "@/actions/actions";
import MyListings from "@/components/myListings/MyListings";

export const metadata = {
  title: "عقاراتي",
};

const MyPropertiesPage = async ({ searchParams: { status } }) => {
  const { data } = await getUserProperty(status ?? "active");
  return (
    <MyListings 
      properties={data} 
      status={status ?? "active"} 
    />
  );
};

export default MyPropertiesPage;
