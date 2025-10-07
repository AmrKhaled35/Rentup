import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const DashboardCard = ({ title, count, icon, bg, link }) => {
  const t = useTranslations("others");

  return (
    <div
      className="p-6 bg-white border border-[#F0F2F5] rounded-md flex items-center"
      style={{
        background: `url(${bg}) no-repeat bottom right`,
      }}
    >
      <Image src={icon} alt="" width={56} height={56} />
      <div className="ml-6">
        <p className="text-sm font-medium text-[#8081A2]">{t(title)}</p>
        <p className="text-xl font-semibold mt-[6px]">{count}</p>
      </div>
      {link && (
        <Link href={link} className="ms-auto">
          <Image src="/icon/arrow-right.svg" alt="" width={11} height={6} />
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
