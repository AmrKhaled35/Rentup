import { useState } from "react";
import myAxios from "@/utils/myAxios";
import toast from "react-hot-toast";

const PasswordForgotModal = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);

    myAxios
      .post("/password/email", formData)
      .then((res) => {
        if (res.data.status === "success") {
          setLoading(false);
          toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
          setIsOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-[30px] sm:p-[45px] shadow-lg ml-4 mr-4 max-w-[650px] rounded-[21px]">
            <button
              className="absolute top-[10px] right-[10px] bg-[#F8F6F1] text-dark hover:bg-light-grey rounded-full p-[3px] sm:p-[5px]"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
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
            <div className="">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-5 border rounded-[10px] text-gray8c text-lg mb-4 focus:outline-none"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
              <button
                onClick={handleSubmit}
                className="w-full h-12 flex justify-center items-center py-[14px] rounded-[10px] text-white bg-[#00B140] text-xl font-semibold disabled:bg-[#00B140]/50"
                disabled={loading}
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordForgotModal;
