import PurchaseTable from "@/components/paymentLog/PurchaseTable";

export const metadata = {
  title: "سجل المشتريات"
}

const page = () => {
  return (
    <div>
      <p className="text-center text-4xl font-medium">سجل المشتريات</p>
      <PurchaseTable />
    </div>
  );
};

export default page;
