"use client";

import MessageCard from "@/components/cards/MessageCard";
import { authKey } from "@/constant";
import myAxios from "@/utils/myAxios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const greenColor = "bg-green-500"; 

const ViewTicket = ({ slug, user }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const token = Cookies.get(authKey);

  useEffect(() => {
    if (token) {
      myAxios(`/customer/messages/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setMessageData(res.data.data))
        .catch((err) => console.log(err.message));
    }
  }, [slug, token, refetch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    files?.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });
    formData.append("message", message);
    formData.append("user_id", user?.id);
    formData.append("ticket_id", slug);

    myAxios
      .post("/customer/messages", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setRefetch((p) => !p);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleCloseTicket = () => {
    myAxios(`/customer/close-tickets/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.status === "success") {
          setRefetch((p) => !p);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="bg-white rounded-md shadow-sm">
        <div className="flex justify-between items-center px-5 py-3">
          <p>{messageData[0]?.support_ticket?.ticket_id}</p>
          {!messageData[0]?.support_ticket?.status ? (
            <button className="text-red-500 bg-red-100 border border-red-500 px-3 py-2 text-xs rounded-md">
              مغلق
            </button>
          ) : (
            <button
              onClick={handleCloseTicket}
              className="text-red-500 bg-red-100 border border-red-500 px-3 py-2 rounded-md text-xs"
            >
              إغلاق التذكرة
            </button>
          )}
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="p-5">
            <div>
              <p className="font-medium">الرسالة</p>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-40 px-5 py-2 mt-3 border border-[#E6E6EB] rounded-lg resize-none focus:ring-0 focus:border-[#E6E6EB] form-textarea"
                required
              />
            </div>
            <div className="mt-5">
              <p className="font-medium">المرفقات</p>
              <input
                onChange={(e) => setFiles([...e.target.files])}
                type="file"
                multiple
                className="w-full text-sm text-grayA6 border border-[#E6E6EB] rounded-lg cursor-pointer mt-3 file:mr-4 file:h-11 file:px-4 file:border-0 file:text-sm file:bg-slate-100"
              />
            </div>
            <button
              type="submit"
              className={`mt-7 py-2 w-full ${greenColor} text-white font-medium rounded-lg disabled:bg-green-300`}
              disabled={!messageData[0]?.support_ticket?.status}
            >
              الرد
            </button>
          </div>
        </form>
      </div>
      {messageData.length > 0 && (
        <div className="bg-white border p-5 rounded-md space-y-4 mt-5">
          {messageData.map((item) => (
            <MessageCard key={item.id} data={item} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTicket;
