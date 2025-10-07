import myAxios from "@/utils/myAxios";
import { useState } from "react";
import toast from "react-hot-toast";

const ReportModal = ({ isOpen, setIsOpen, id, token }) => {
  const [loading, setLoading] = useState(false);

  const handleReport = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    setLoading(true);
    const toastId = toast.loading("جاري الإرسال...");
    myAxios
      .post(
        "/customer/report",
        { title, description, property_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setLoading(false);
        setIsOpen(false);
        toast.dismiss(toastId);
        if (res.data.status === "success") {
          toast.success("تم إرسال البلاغ!");
        }
      })
      .catch((err) => console.log(err?.response?.data?.message));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div className="fixed inset-0 bg-black/50"></div>
          <div className="absolute bg-white p-[30px] sm:p-[45px] shadow-lg max-w-[650px] w-full rounded-[20px]">
            <button
              className="absolute top-[10px] right-[10px] bg-[#F8F6F1] text-dark hover:bg-light-grey rounded-full p-[3px] sm:p-[5px]"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#00B140"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <form onSubmit={handleReport}>
              <p className="text-2xl font-semibold">الإبلاغ عن العقار</p>
              <div className="mt-10 space-y-8">
                <div>
                  <p>العنوان</p>
                  <input
                    type="text"
                    name="title"
                    className="form-input text-sm focus:ring-0 border-gray-200 focus:border-gray-200 mt-1 rounded-md w-full"
                  />
                </div>
                <div>
                  <p>الوصف</p>
                  <textarea
                    name="description"
                    className="form-textarea text-sm border-gray-200 focus:border-gray-200 focus:ring-0 w-full rounded-md mt-1 h-28"
                  />
                </div>
              </div>
              <div className="mt-10 text-center">
                <button
                  type="submit"
                  className="text-white bg-[#00B140] rounded-[10px] py-3 px-10 font-medium"
                  disabled={loading}
                >
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModal;
