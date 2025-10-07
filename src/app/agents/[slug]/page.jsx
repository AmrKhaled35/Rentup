import Container from "@/components/shared/Container";
import Image from "next/image";
import Properties from "./Properties";
import { getSingleAgent } from "@/actions/actions";

export const metadata = {
  title: "Agent",
};

const page = async ({ params: { slug }, searchParams: { page } }) => {
  const { data, user, paginationInfo } = await getSingleAgent(slug, page);

  return (
    <Container>
      <div className="my-12 bg-dark p-4 rounded-2xl flex flex-col lg:flex-row lg:items-center">
        <div className="flex items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${user?.user_img}`}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-[10px] h-[75px] lg:h-40 w-auto"
          />
          <div className="ml-4 lg:ml-12">
            <p className="text-xl lg:text-2xl font-medium text-white">
              {user?.name}
            </p>
            <p className="flex items-center gap-[10px] mt-[10px] lg:mt-5">
              <Image
                src="/icon/location-red.svg"
                alt="#"
                width={14}
                height={20}
              />
              <span className="text-sm lg:text-xl text-[#E0E0E0]">
                {user?.address}
              </span>
            </p>
          </div>
        </div>
        <hr className="lg:hidden my-4" />
        <div className="lg:ms-auto">
          <p className="flex items-center gap-[10px]">
            <Image src="/icon/phone-blue.svg" alt="#" width={20} height={20} />
            <span className="text-sm lg:text-xl text-white">{`${user?.country?.phone_code} ${user?.phone}`}</span>
            {user?.is_number_verified && (
              <Image
                src="/icon/check-green.svg"
                alt="#"
                width={0}
                height={0}
                sizes="100vw"
                className="size-[14px] lg:size-5"
              />
            )}
          </p>
          <p className="flex items-center gap-[10px] mt-[10px] lg:mt-4">
            <Image
              src="/icon/envelop-blue.svg"
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="size-[14px] lg:size-5"
            />
            <span className="text-sm lg:text-xl text-white">{user?.email}</span>
            {user?.is_email_verified && (
              <Image
                src="/icon/check-green.svg"
                alt="#"
                width={0}
                height={0}
                sizes="100vw"
                className="size-[14px] lg:size-5"
              />
            )}
          </p>
        </div>
      </div>
      <Properties data={data} paginationInfo={paginationInfo} />
    </Container>
  );
};

export default page;
