import dynamic from "next/dynamic";
const PackageCard = dynamic(() => import("@/components/cards/PackageCard"), {
  ssr: false,
});

const Subscription = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-9">
      {data?.map((item) => (
        <PackageCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Subscription;
