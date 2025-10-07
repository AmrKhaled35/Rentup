import { getUser } from "@/actions/actions";
import ViewTicket from "@/components/supportTicket/ViewTicket";

export const metadata = {
  title: "عرض التذكرة",
};

const TicketDetailsPage = async ({ params: { slug } }) => {
  const { data } = await getUser();

  return <ViewTicket slug={slug} user={data} />;
};

export default TicketDetailsPage;
