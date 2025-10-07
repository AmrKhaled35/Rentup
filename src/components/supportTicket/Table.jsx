'use client'

import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Table = () => {
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get(authKey);

  useEffect(() => {
    myAxios("/customer/tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setRowData(res.data.data))
      .catch((err) => console.log(err.message));
  }, [token]);

  const columns = [
    {
      name: "Subject",
      selector: (row) => <p className="text-skyBlue">{row?.subject}</p>,
    },
    {
      name: "Status",
      selector: (row) => (
        <p
          className={`${
            row?.status
              ? "text-green-500 bg-green-100"
              : "text-red-500 bg-red-100"
          } py-2 px-3 rounded font-medium`}
        >
          {row?.status ? "Open" : "Close"}
        </p>
      ),
    },
    {
      name: "Priority",
      selector: (row) => (
        <p
          className={`${
            row?.priority === "low"
              ? "text-green-100 bg-green-500"
              : row?.priority === "medium"
              ? "text-[#ffab1a] bg-yellow-100"
              : row?.priority === "high"
              ? "text-red-500 bg-red-100"
              : ""
          } py-2 px-3 rounded capitalize font-medium`}
        >
          {row?.priority}
        </p>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <Link href={`/support-ticket/${row?.id}`}>
          <Image src="/icon/eye.svg" alt="" width={20} height={20} />
        </Link>
      ),
      width: "120px",
    },
  ];

  return (
    <div className="mt-5 max-w-full !overflow-x-auto border border-gray-200 rounded-md">
      <DataTable
        columns={columns}
        data={rowData}
        pagination={false}
        responsive={true}
      />
    </div>
  );
};

export default Table;
