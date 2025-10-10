import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
import { QRCodeCanvas } from "qrcode.react";

const ShareModal = ({ isOpen, setIsOpen, url }) => {
  const handleCopyQR = () => {
    const canvas = document.querySelector("#qrCanvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      });
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("#qrCanvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mt-[78px] my-2">
          <div className="fixed inset-0 bg-black opacity-60"></div>
          <div className="absolute w-full max-w-sm bg-white shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">المشاركة على</p>
              <button
                className="text-dark hover:bg-light-grey rounded-full sm:p-[5px]"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <hr className="-mx-5 mt-2" />
            <div className="flex flex-col items-center py-4">
              <QRCodeCanvas id="qrCanvas" value={url} size={128} />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleCopyQR}
                  className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                >
                  نسخ QR
                </button>
                <button
                  onClick={handleDownloadQR}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  تحميل QR
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 py-4">
              <FacebookShareButton
                url={url}
                className="flex flex-col items-center gap-2"
              >
                <FacebookIcon size={44} className="rounded-full" />
                <span className="text-xs">فيسبوك</span>
              </FacebookShareButton>

              <TwitterShareButton
                url={url}
                className="flex flex-col items-center gap-2"
              >
                <TwitterIcon size={44} className="rounded-full" />
                <span className="text-xs">تويتر</span>
              </TwitterShareButton>

              <PinterestShareButton
                url={url}
                media={`${window.location}/${"exampleImage"}`}
                className="flex flex-col items-center gap-2"
              >
                <PinterestIcon size={44} className="rounded-full" />
                <span className="text-xs">بنترست</span>
              </PinterestShareButton>
            </div>

            <p className="text-sm text-grey">أو ببساطة انسخ الرابط</p>
            <input
              type="text"
              className="mt-4 h-8 w-full border rounded-lg text-sm px-2"
              value={url}
              readOnly
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
