import {
  getCategories,
  getCities,
  getCountries,
  getFacilities,
  getOutdoorFacilities,
} from "@/actions/actions";
import AddPropertyForm from "@/components/addProperty/AddPropertyForm";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Create Property",
};

const page = async () => {
  const [
    { data: categories },
    { data: facilities },
    { data: outdoorFacilities },
    { data: countries },
    { data: cities },
  ] = await Promise.all([
    getCategories(),
    getFacilities(),
    getOutdoorFacilities(),
    getCountries(),
    getCities(),
  ]);

  return (
    <Container>
      <AddPropertyForm
        categories={categories}
        facilities={facilities}
        outdoorFacilities={outdoorFacilities}
        countries={countries}
        cities={cities}
      />
    </Container>
  );
};

export default page;
