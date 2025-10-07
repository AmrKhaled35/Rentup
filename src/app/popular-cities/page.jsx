import { getPopularCities } from "@/actions/actions";
import PopularCityCard from "@/components/cards/PopularCityCard";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata = {
  title: 'Popular Cities'
}

const page = async () => {
  const { data: cities } = await getPopularCities();
  
  return (
    <Container>
     <PageHeader
        src="/property/popular-cities.jpg"
        title="Popular Cities"
      />
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
        {cities?.map((item) => (
          <PopularCityCard
            key={item.id}
            src={item.img}
            title={item.city_name}
          />
        ))}
      </div>
    </Container>
  );
};

export default page;
