import Image from "next/image";

const FacilityItem = ({ icon, title, value, KM }) => {
  return (
    <div className="grid grid-cols-[60%_1fr] gap-10 py-4 first-of-type:border-t-2 last-of-type:!border-b-2 border-dashed ">
      <div className="flex gap-6">
        <Image src={icon} alt="#" width={20} height={20} className="size-5" />
        <p className="text-[#5E5E5E] text-sm font-medium">{title}</p>
      </div>
      <p className="text-end font-light text-[#666666] text-sm">
        {value}
        {KM && " KM"}
      </p>
    </div>
  );
};

export default FacilityItem;
