import Link from "next/link";
import Container from "../shared/Container";
import AgentCard from "../cards/AgentCard";
import { getTranslations } from "next-intl/server";

const OurAgent = async ({ data = [] }) => {
  const t = await getTranslations("sectionTitle");

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1500"
      className="mt-16 mb-[120px]"
    >
      <Container>
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">
            {t("Our Incredible Agents")}
          </span>
          <Link href="/agents" className="text-skyBlue text-sm font-medium">
            {t("See All")}
          </Link>
        </p>
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-8">
          {data?.slice(0, 4).map((item) => (
            <AgentCard key={item.id} data={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurAgent;
