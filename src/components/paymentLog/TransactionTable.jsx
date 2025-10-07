"use client";
import DataTable from "react-data-table-component";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const TransactionTable = ({ transactions }) => {
  const columns = [
    {
      name: "Gateway | Transaction",
      selector: (row) => (
        <div className="text-center py-2">
          <p className="capitalize text-sm">{row?.payment_method}</p>
          <p className="mt-1">{row?.transaction_id}</p>
        </div>
      ),
    },
    {
      name: "Initiated",
      selector: (row) => (
        <div className="text-center py-2">
          <p className="capitalize text-sm">
            {dayjs(row?.initiated).format("YYYY-MM-DD hh:mm A")}
          </p>
          <p className="mt-1">{dayjs(row?.initiated).fromNow()}</p>
        </div>
      ),
    },
    {
      name: "Amount",
      selector: (row) => (
        <div className="text-center py-2">{row?.credits || 0} USD</div>
      ),
    },
    {
      name: "Conversion",
      selector: (row) => (
        <div className="text-center">
          <p>{row?.conversion}</p>
          <p className="mt-1 font-semibold">
            {row?.amount} {row?.currency}
          </p>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="text-center py-4">
          {row?.status === "success" ? (
            <p className="bg-green-100 p-2 rounded text-green-500 text-xs">
              ناجحة
            </p>
          ) : (
            <p className="bg-red-100 p-2 rounded text-red-500 text-xs">فشل</p>
          )}
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="mt-5 max-w-full !overflow-x-auto border border-gray-200 rounded-md">
      <DataTable
        columns={columns}
        data={transactions}
        pagination={false}
        responsive={true}
      />
    </div>
  );
};

export default TransactionTable;
