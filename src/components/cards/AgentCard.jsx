import Image from "next/image";
import Link from "next/link";

const AgentCard = ({ data }) => {
  const {
    id,
    name,
    email,
    phone,
    address,
    is_number_verified,
    is_email_verified,
    user_img,
    country,
  } = data;
  return (
    <Link href={`/agents/${id}`}>
      <div className="rounded-[10px] bg-white shadow-md overflow-hidden">
        <Image
          src={
            user_img
              ? `${process.env.NEXT_PUBLIC_IMG_URL}${user_img}`
              : "/avatar.png"
          }
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-56 object-cover"
        />
        <p className="mt-4 text-lg font-medium px-4">{name}</p>
        <p className="flex items-center gap-[10px] px-4 mt-4">
          <Image src="/icon/location-red.svg" alt="#" width={9} height={14} />
          <span className="text-sm text-gray55">{address}</span>
        </p>
        <hr className="my-3" />
        <p className="flex items-center gap-[10px] px-4 mt-4">
          <Image src="/icon/phone-blue.svg" alt="#" width={14} height={14} />
          <span className="text-sm text-gray55">{`${country?.phone_code} ${phone}`}</span>
         {/*  {is_number_verified ? (
            <Image src="/icon/check-green.svg" alt="#" width={14} height={14} />
          ):''} */}
        </p>
        <p className="flex items-center gap-[10px] px-4 mt-4 mb-6">
          <Image src="/icon/envelop-blue.svg" alt="#" width={14} height={14} />
          <span className="text-sm text-gray55">{email}</span>
          {is_email_verified ? (
            <Image src="/icon/check-green.svg" alt="#" width={14} height={14} />
          ):''}
        </p>
      </div>
    </Link>
  );
};

export default AgentCard;
