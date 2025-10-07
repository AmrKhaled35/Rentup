import { getUser } from "@/actions/actions";
import Container from "@/components/shared/Container";
import SideNav from "@/components/shared/SideNav";

const layout = async ({ children }) => {
  const { data } = await getUser();

  return (
    <Container>
      <div className="md:grid lg:grid-cols-[300px_1fr] md:gap-10 min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-100px)] max-h-fit py-7">
        <SideNav user={data} />
        {children}
      </div>
    </Container>
  );
};

export default layout;
