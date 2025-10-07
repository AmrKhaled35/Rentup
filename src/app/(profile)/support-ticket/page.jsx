import Table from "@/components/supportTicket/Table";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "التذاكر المفتوحة"
}

const SupportTicketPage = () => {
  return (
    <div>
      <div className="flex justify-end mb-5">
        <Link href="/support-ticket/new">
          <button className="py-2 px-4 bg-green-500 text-white font-medium rounded-md flex items-center justify-center gap-2">
            <Image src="/icon/plus.svg" alt="" width={20} height={20} />
            تذكرة جديدة
          </button>
        </Link>
      </div>
      <Table />
    </div>
  );
};

export default SupportTicketPage;
