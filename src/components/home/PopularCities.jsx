import Link from "next/link";
import Container from "../shared/Container";
import { getTranslations } from "next-intl/server";

const PopularCities = async ({ data }) => {
  const t = await getTranslations("sectionTitle");

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-16">
      <Container>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-medium text-black">
            {t("Popular Cities")}
          </span>
          <Link
            href="/popular-cities"
            className="text-green-500 text-sm font-medium hover:underline"
          >
            {t("All Cities")}
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap justify-center items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 shadow-sm">
            {data?.slice(0, 8).map((item, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  i === 0
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-black border-gray-300 hover:bg-green-100 hover:border-green-400"
                }`}
              >
                {item.city_name}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PopularCities;
