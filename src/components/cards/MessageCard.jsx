import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const MessageCard = ({ data, user }) => {
  const { user_id, message, created_at, attachments } = data;

  return (
    <div
      className={`${
        user_id
          ? "border-skyBlue bg-skyBlue/10"
          : "border-[#E46A11] bg-[#E46A11]/10"
      } border p-4 rounded-md grid grid-cols-[200px_1fr]`}
    >
      <div
        className={`border-r pr-4 text-xl font-medium flex justify-center items-center gap-5 ${
          user_id ? "border-skyBlue" : "border-[#E46A11]"
        }`}
      >
        <Image
          src={
            user?.user_img
              ? `${process.env.NEXT_PUBLIC_IMG_URL}${user?.user_img}`
              : "/avatar.png"
          }
          alt=""
          width={34}
          height={34}
          className={`rounded-full border-2 ${
            user_id ? "border-skyBlue" : "border-[#E46A11]"
          }`}
        />
        <p className={`${user_id ? "text-skyBlue" : "text-[#E46A11]"}`}>
          {user_id ? user?.name : "Admin"}
        </p>
      </div>
      <div className="pl-4">
        <p className="font-semibold text-gray3B my-2">
          Posted on {dayjs(created_at).format("dddd, D MMMM YYYY [@] hh:mm A")}
        </p>
        <p className="text-gray55">{message}</p>
        {attachments.length > 0 &&
          attachments.map((item, index) => (
            <Link
              key={item.id}
              href={`${process.env.NEXT_PUBLIC_IMG_URL}${item.file}`}
              className="text-skyBlue mt-2 flex items-center gap-2"
            >
              <Image
                src={
                  user_id
                    ? "/icon/user-attachment.svg"
                    : "/icon/admin-attachment.svg"
                }
                alt=""
                width={14}
                height={14}
              />
              Attachment {index + 1}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MessageCard;
