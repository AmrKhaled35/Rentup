import Container from "@/components/shared/Container";
import Image from "next/image";
import Accordion from "./Accordion";
import { getFAQ } from "@/actions/actions";

export const metadata = {
  title: "FAQ",
};

const page = async () => {
  const { data } = await getFAQ();

  return (
    <Container>
      <div className="mt-8 h-36 relative rounded-[10px] border border-black/5 overflow-hidden">
        <Image src="/more-page.svg" alt="#" fill className="object-cover" />
        <div className="absolute size-full flex justify-center items-center">
          <p className="text-3xl font-semibold">FAQs</p>
        </div>
      </div>
      <div className="mt-20 mb-10">
        <p className="text-center text-3xl font-medium">
          Frequently Asked Questions
        </p>
        <p className="mt-6 text-center text-lg lg:w-3/4 mx-auto text-gray55">
          Get answers to common questions about buying, selling, and financing
          homes. Explore our FAQs to make informed decisions on your real estate
          journey.
        </p>
      </div>
      <div className="lg:w-4/5 mx-auto my-10 space-y-4">
        {data.map((item) => (
          <Accordion key={item.id} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default page;
