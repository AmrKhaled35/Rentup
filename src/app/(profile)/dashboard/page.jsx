import { getUserProperty } from "@/actions/actions";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const { data } = await getUserProperty();
  return <Dashboard properties={data} />;
};

export default DashboardPage;
