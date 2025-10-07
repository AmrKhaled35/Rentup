import { getGateways } from "@/actions/actions";
import Deposit from "@/components/deposit/Deposit";

export const metadata = {
  title: "إيداع",
};

const DepositPage = async () => {
  const { data } = await getGateways();

  return <Deposit gateways={data} />;
};

export default DepositPage;
