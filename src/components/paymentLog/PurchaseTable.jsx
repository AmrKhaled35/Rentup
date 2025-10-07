"use client";

import { useEffect, useState } from "react";
import myAxios from "@/utils/myAxios";
import DataTable from "react-data-table-component";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import NotFound from "../shared/NotFound";
import Cookies from "js-cookie";
import { authKey } from "@/constant";

dayjs.extend(relativeTime);

const PurchaseTable = () => {
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get(authKey);

  useEffect(() => {
    if (token) {
      myAxios("/customer/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setRowData(res.data.data))
        .catch((err) => console.log(err.message));
    }
  }, [token]);

  const columns = [
    {
      name: "رقم المعاملة",
      selector: (row) => (
        <div className="text-center py-2">
          <p className="capitalize text-sm">{row?.payment_method}</p>
          <p>{row?.transaction_id}</p>
        </div>
      ),
    },
    {
      name: "تاريخ العملية",
      selector: (row) => (
        <div className="text-center py-2">
          <p className="capitalize text-sm">
            {dayjs(row?.initiated).format("YYYY-MM-DD hh:mm A")}
          </p>
          <p>{dayjs(row?.initiated).fromNow()}</p>
        </div>
      ),
    },
    {
      name: "المبلغ",
      selector: (row) => <div className="text-center py-2">{row?.amount}</div>,
    },
    {
      name: "الهدف",
      selector: (row) => <div className="text-center py-2">{row?.used_for}</div>,
    },
    {
      name: "الحالة",
      selector: (row) => (
        <div className="text-center py-4">
          {row?.status === "1" ? (
            <p className="bg-[#00B140]/20 p-2 rounded text-[#00B140] text-xs">
              ناجحة
            </p>
          ) : (
            <p className="bg-red-100 p-2 rounded text-red-500 text-xs">فشلت</p>
          )}
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="mt-5 max-w-full !overflow-x-auto border border-gray-200 rounded-md">
      {rowData.length > 0 ? (
        <DataTable
          columns={columns}
          data={rowData}
          pagination={false}
          responsive={true}
        />
      ) : (
        <div>
          <NotFound message="لا توجد بيانات" />
        </div>
      )}
    </div>
  );
};

export default PurchaseTable;
