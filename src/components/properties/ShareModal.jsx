import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

const ShareModal = ({ isOpen, setIsOpen, url }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mt-[78px] my-2">
          <div className="fixed inset-0 bg-black opacity-60"></div>
          <div className="absolute w-full max-w-sm h-64 bg-white shadow-lg rounded-xl p-5">
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
            </div>
            <hr className="-mx-5" />
            <div className="flex items-center gap-6 py-6">
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
