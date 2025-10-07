import { getTranslations } from "next-intl/server";
import PackageCard from "../cards/PackageCard";
import Container from "../shared/Container";
import { getPackage, getUser } from "@/actions/actions";

const SubscriptionPlan = async () => {
  const [{ data: packData }, { data: user }] = await Promise.all([
    getPackage(),
    getUser(),
  ]);
  const t = await getTranslations("sectionTitle");

  return (
    <Container>
      <p className="text-5xl font-semibold text-center mt-40">
        {t("Choose Your Plan")}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-28">
        {packData?.map((item) => (
          <PackageCard key={item.id} data={item} user={user} />
        ))}
      </div>
    </Container>
  );
};

export default SubscriptionPlan;
