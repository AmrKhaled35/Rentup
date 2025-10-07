import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";
import { getAgent } from "@/actions/actions";
import AgentCard from "@/components/cards/AgentCard";
import RSPagination from "@/components/shared/RSPagination";

export const metadata = {
  title: "الوكلاء",
};

const AgentPage = async ({ searchParams: { page } }) => {
  const { data, paginationInfo } = await getAgent(page);

  return (
    <Container>
      <PageHeader
        src="/property/agents.jpg"
        title="جميع وكلائنا الرائعين"
      />
      <div className="my-12 grid grid-cols-1 xl:grid-cols-4 gap-5 lg:gap-8">
        {data?.map((item) => (
          <AgentCard key={item.id} data={item} />
        ))}
      </div>
      <RSPagination total_pages={paginationInfo?.total_pages} />
    </Container>
  );
};

export default AgentPage;
