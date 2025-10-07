import Image from "next/image";
import Container from "../shared/Container";
import HeroSearch from "./HeroSearch";
import { getCategories, getCities, getHeroSection } from "@/actions/actions";

const Hero = async () => {
  const [{ data: general }, { data: categories }, { data: cities }] =
    await Promise.all([getHeroSection(), getCategories(), getCities()]);

  const { hero_title, hero_description, banner, section } = general || {};

  return (
    <section className="bg-whiteF5 relative h-[550px] md:h-[650px] overflow-hidden">
      <Image
        src={
          banner
            ? `${process.env.NEXT_PUBLIC_IMG_URL}${banner}`
            : "/home/hero.png"
        }
        alt="#"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute h-full top-[40%] lg:top-0 w-auto left-0" 
      />
      <Container>
        <div className="absolute top-0 right-12 text-right"> 
          <span className="px-4 lg:px-6 py-2 lg:py-3 border border-dark rounded-[10px] text-lg font-medium inline-block mt-14">
            {"العقارات"}
          </span>

          <p className="text-[28px] md:text-[45px] font-semibold mt-6 lg:mt-8 leading-tight lg:w-[58%] ml-auto">
            {"مع Rent Up غيرنا مفهوم الإيجار بفلسطين !!"}
          </p>

          <p className="mt-4 md:mt-6 text-gray8c lg:w-2/4 ml-auto">
            {"استأجر اي عقار بضغطة زر \
مع rent up … استأجر الآن !"}
          </p>
        </div>
        <HeroSearch cities={cities} categories={categories} />
      </Container>
    </section>
  );
};

export default Hero;
