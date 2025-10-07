import Container from "../shared/Container";
import TestimonialSlider from "./TestimonialSlider";
import { getTestimonials } from "@/actions/actions";

async function translateToArabic(text) {
  return text;
}

const Testimonial = async () => {
  const { data } = await getTestimonials();
  const translatedData = await Promise.all(
    data.map(async (item) => ({
      ...item,
      name: await translateToArabic(item.name),
      message: await translateToArabic(item.message),
      position: await translateToArabic(item.position),
    }))
  );

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1500"
      className="mt-24 lg:mt-32 pb-28 font-rubik"
    >
      <Container>
        <span className="px-4 lg:px-6 py-2 lg:py-3 border border-dark rounded-[10px] text-sm lg:text-lg font-medium inline-block">
          آراء العملاء
        </span>
        <TestimonialSlider testimonialData={translatedData} />
      </Container>
    </section>
  );
};

export default Testimonial;
