import { getAllConversation, getToken } from "@/actions/actions";
import Container from "@/components/shared/Container";
import ChattingList from "./ChattingList";

export const metadata = {
  title: "Chats",
  robots: { index: false },
};

const ChatPage = async () => {
  const { data } = await getAllConversation();

  return (
    <div className="bg-whiteF5 overflow-hidden py-5 pt-0 lg:pt-5">
      <Container>
        <div className="bg-white lg:rounded-2xl lg:shadow-[0_11px_15px_0px_rgba(0,79,38,0.10)] p-4 pt-2 lg:pt-4 h-[calc(100vh-80px)] lg:h-[calc(100vh-140px)] -mx-4 lg:mx-0">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-4 w-full h-full">
            <div
              className="space-y-2 lg:overflow-y-auto custom-scrollbar"
              data-prevent-lenis
            >
              {data.length > 0 ? (
                data.map((item) => <ChattingList key={item.id} data={item} />)
              ) : (
                <p className="text-dark text-center text-xl mt-5 font-semibold">
                  No conversation
                </p>
              )}
            </div>
            <div className="lg:border border-skyBlue lg:rounded-xl lg:flex flex-col justify-between w-full h-full"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChatPage;
