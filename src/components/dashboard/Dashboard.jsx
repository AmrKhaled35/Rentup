"use client";

import DashboardCard from "@/components/cards/DashboardCard";
import PropertyCardVertical from "@/components/cards/PropertyCardVertical";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import NotFound from "../shared/NotFound";
import { useTranslations } from "next-intl";

const Dashboard = ({ properties }) => {
  const { favIds } = useAuth();
  const [favorite, setFavorite] = useState(favIds);
  const featuredProperties = properties?.filter((item) => item.is_featured);
  const t = useTranslations("others");

  const approvedProperties = properties?.filter(
    (item) => item.status === "active"
  );
  const pendingProperties = properties?.filter(
    (item) => item.status === "pending"
  );
  const disabledProperties = properties?.filter(
    (item) => item.status === "disabled"
  );
  const rejectedProperties = properties?.filter(
    (item) => item.status === "rejected"
  );

  return (
    <div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          count={properties.length}
          icon="/icon/properties-added.svg"
          title="Properties Added"
          bg="/icon/properties-added-bg.svg"
          link="/my-properties"
        />
        <DashboardCard
          count={approvedProperties?.length}
          icon="/icon/approved-properties.svg"
          title="Approved Properties"
          bg="/icon/approved-properties-bg.svg"
          link="/my-properties?status=active"
        />
        <DashboardCard
          count={pendingProperties?.length}
          icon="/icon/pending-properties.svg"
          title="Pending Properties"
          bg="/icon/pending-properties-bg.svg"
          link="/my-properties?status=pending"
        />
        <DashboardCard
          count={featuredProperties?.length}
          icon="/icon/featured-properties.svg"
          title="Featured Properties"
          bg="/icon/featured-properties-bg.svg"
        />
        <DashboardCard
          count={disabledProperties?.length}
          icon="/icon/disabled-properties.svg"
          title="Disabled Properties"
          bg="/icon/disabled-properties-bg.svg"
          link="/my-properties?status=disabled"
        />
        <DashboardCard
          count={rejectedProperties?.length}
          icon="/icon/rejected-properties.svg"
          title="Rejected Properties"
          bg="/icon/rejected-properties-bg.svg"
          link="/my-properties?status=rejected"
        />
      </div>
      <p className="mt-10 text-xl font-medium">{t("My Featured Properties")}</p>
      {featuredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
          {featuredProperties?.map((item) => (
            <PropertyCardVertical
              key={item.id}
              favorite={favorite?.includes(item?.id)}
              setFavorite={setFavorite}
              data={item}
            />
          ))}
        </div>
      ) : (
        <div>
          <NotFound message="Properties Data Not Found" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
