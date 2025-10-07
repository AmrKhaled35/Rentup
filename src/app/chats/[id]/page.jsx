import IndividualChat from "./IndividualChat";
import {
  getAllConversation,
  getPusherConfig,
  getUser,
} from "@/actions/actions";

export const metadata = {
  title: "Chats",
  robots: { index: false },
};

const ChatDetailsPage = async ({ params: { id } }) => {
  const { data } = await getAllConversation();
  const { data: user } = await getUser();
  const { data: config } = await getPusherConfig();

  return (
    <IndividualChat id={id} conversations={data} config={config} user={user} />
  );
};

export default ChatDetailsPage;
