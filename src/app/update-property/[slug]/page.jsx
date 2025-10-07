import {
  getCategories,
  getCities,
  getCountries,
  getFacilities,
  getOutdoorFacilities,
  getSingleProperty,
} from "@/actions/actions";
import Container from "@/components/shared/Container";
import UpdateProperty from "@/components/updateProperty/UpdateProperty";

export const metadata = {
  title: "Update Property",
  robots: { index: false },
};

const page = async ({ params: { slug } }) => {
  const [
    { data: property },
    { data: categories },
    { data: facilities },
    { data: outdoorFacilities },
    { data: countries },
    { data: cities },
  ] = await Promise.all([
    getSingleProperty(slug),
    getCategories(),
    getFacilities(),
    getOutdoorFacilities(),
    getCountries(),
    getCities(),
  ]);

  return (
    <Container>
      <UpdateProperty
        property={property}
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
