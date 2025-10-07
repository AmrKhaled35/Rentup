import { getTransaction, getUser } from "@/actions/actions";
import Wallet from "@/components/wallet/Wallet";

export const metadata = {
  title: "المحفظة",
};

export const revalidate = 0;

const WalletPage = async () => {
  const [{ data: transactions }, { data: user }] = await Promise.all([
    getTransaction(),
    getUser(),
  ]);

  return <Wallet user={user} transactions={transactions} />;
};

export default WalletPage;
