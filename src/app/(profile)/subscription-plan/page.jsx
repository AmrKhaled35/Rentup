import { getPackage, getUser } from "@/actions/actions";
import dynamic from "next/dynamic";
const PackageCard = dynamic(() => import("@/components/cards/PackageCard"), {
  ssr: false,
});

export const metadata = {
  title: "خطط الاشتراك",
};

const SubscriptionPage = async () => {
  const [{ data: packData }, { data: user }] = await Promise.all([
    getPackage(),
    getUser(),
  ]);

  return (
    <div>
      <p className="text-center text-2xl font-medium">اختر أفضل خطة لك</p>
      <p className="mt-3 text-gray-500 text-center">
        لنكتشف معًا أفضل الأسعار المناسبة لك.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-9">
        {packData?.map((item) => (
          <PackageCard key={item.id} data={item} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
