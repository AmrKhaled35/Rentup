import CallButton from "@/components/properties/CallButton";
import FacilityCard from "@/components/properties/FacilityCard";
import ImageGallery from "@/components/properties/Gallery";
import MessageButton from "@/components/properties/MessageButton";
import MoreProperties from "@/components/properties/MoreProperties";
import OutdoorFacilityCard from "@/components/properties/OutdoorFacilityCard";
import ReportButton from "@/components/properties/ReportButton";
import SaveButton from "@/components/properties/SaveButton";
import ShareButton from "@/components/properties/ShareButton";
import dynamic from "next/dynamic";
const SphereImage = dynamic(
  () => import("@/components/properties/SphereImage"),
  { ssr: false }
);
import Container from "@/components/shared/Container";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import VideoPlayer from "@/components/properties/VideoPlayer";
import Verified from "./Verified";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  getAdUnitIds,
  getRecentlyAdded,
  getSingleAgent,
  getSingleProperty,
  getUser,
} from "@/actions/actions";
import Ad from "@/components/ads/Ad";
dayjs.extend(relativeTime);

export const generateMetadata = async ({ params: { slug } }) => {
  const { data: property } = await getSingleProperty(slug);
  const title = property?.property_title;
  const description = property?.property_description;

  return {
    title,
    description,
  };
};

const page = async ({ params: { slug } }) => {
  const { data: property } = await getSingleProperty(slug);
  const { data: agent } = await getSingleAgent(property?.user_id);
  const { data: properties } = await getRecentlyAdded(1, 4);
  const { data: adUnitIds } = await getAdUnitIds();
  const { data: user } = await getUser();
  const {
    id,
    property_title,
    price,
    address,
    get_property_user,
    created_at,
    get_title_image,
    get_gallery_image,
    property_description,
    get_facility,
    get_outdoor_facility,
    get_country,
    get3d_image,
    get_video_link,
    get_map_link,
  } = property || {};
  const isValid = (url) =>
    url.startsWith("http://") || url.startsWith("https://");

  return (
    <Container>
      <p className="text-[28px] font-semibold mt-8">{property_title}</p>
      <div className="flex justify-between items-center flex-wrap mt-5">
        <p className="flex items-center gap-4">
          <Image src="/icon/location-green.svg" alt="#" width={18} height={18} />
          <span className="font-outfit">{address}</span>
        </p>
        <p className="flex items-center gap-4">
          <Image src="/icon/clock-dark.svg" alt="#" width={18} height={18} />
          <span className="font-outfit">
            {dayjs(created_at).format("DDMMM, YYYY")}
          </span>
        </p>
        <div className="flex items-center justify-between gap-12 w-full lg:w-fit mt-5 lg:mt-0">
          <SaveButton id={slug} />
          <ShareButton />
        </div>
      </div>
      <ImageGallery images={get_gallery_image} title_image={get_title_image} />
      <div className="mt-12 grid xl:grid-cols-[2fr_1fr] gap-8">
        {/* ------------------left-side----------------- */}
        <div>
          <div className="border-2 border-[#E4E7E9] rounded-[10px] py-5 px-10 lg:flex justify-between items-center hidden lg:order-first">
            {get_facility?.slice(0, 4)?.map((item) => (
              <div
                key={item.id}
                className="text-lg text-gray55 flex flex-col items-center gap-5"
              >
                <p>
                  <span className="font-medium mr-1">{item.f_value}</span>{" "}
                  {item.f_title}
                </p>
                <div className="size-6 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.f_icon}`}
                    alt="#"
                    fill
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-2xl font-medium">حول هذا العقار</p>
            <p className="text-[#666] mt-5">{property_description}</p>
          </div>
          <hr className="border my-10" />
          <div>
            <p className="text-2xl font-medium">تفاصيل أكثر</p>
            <FacilityCard type="Interior" data={get_facility} />
            <OutdoorFacilityCard type="Ourdoor" data={get_outdoor_facility} />
            {get3d_image?.threed_img && isValid(get3d_image?.threed_img) && (
              <SphereImage link={get3d_image?.threed_img} />
            )}
          </div>
          {get_video_link?.link && isValid(get_video_link?.link) && (
            <div className="mt-20 rounded-lg overflow-hidden">
              <VideoPlayer link={get_video_link?.link} />
            </div>
          )}
          {get_map_link?.map_link && (
            <div className="mt-20 rounded-lg overflow-hidden">
              <GoogleMapsEmbed
                apiKey="AIzaSyDpn07mObwbPevigwGfuvqPKLpqkm_LL8E"
                height={320}
                width="100%"
                q={get_map_link?.map_link}
              />
            </div>
          )}
          <div className="bg-whiteF5 border border-[#E4E7E9] rounded-xl px-5 py-6 mt-9 flex flex-col md:flex-row justify-between gap-7 lg:gap-0">
            <div className="flex flex-row-reverse md:flex-row items-start justify-between md:items-center gap-7">
              {get_property_user?.user_img ? (
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_IMG_URL}/${get_property_user.user_img}` ||
                    "/avatar.png"
                  }
                  alt="person"
                  height={140}
                  width={140}
                  className="rounded-full size-[140px] object-cover"
                />
              ) : (
                <Image
                  src="/avatar.png"
                  alt="person"
                  height={140}
                  width={140}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col">
                <p className="text-2xl !text-dark font-bold">
                  {get_property_user?.name}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex gap-2 bg-white rounded-md px-3 py-1">
                    <Image
                      src={`/icon/${
                        get_property_user?.is_number_verified
                          ? "check2.svg"
                          : "cross.svg"
                      }`}
                      alt=""
                      width={14}
                      height={14}
                    />
                    <p>تم التحقق من الرقم</p>
                  </div>
                  <div className="bg-white rounded-md px-3 py-1">
                    <p>
                      {get_property_user?.user_type_id === 1
                        ? "وكيل"
                        : get_property_user?.user_type_id === 2
                        ? "سمسار"
                        : "مالك"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm !text-dark">
                  <Image
                    src={"/icon/location2.svg"}
                    alt=""
                    width={11}
                    height={16}
                  />
                  <span>{get_property_user?.address}</span>
                </p>
                <p className="text-sm !text-dark mt-1">
                  عضو منذ:{" "}
                  {dayjs(get_property_user?.created_at).fromNow(true)}
                </p>
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <p className="!text-dark font-semibold mb-3">تم التحقق:</p>
              <div className="flex gap-2">
                <Verified
                  imgL={"/icon/phone-green.svg"}
                  imgR={`/icon/cross.svg`}
                  title="الهاتف"
                />
                <Verified
                  imgL={"/icon/envelop-green.svg"}
                  imgR={`/icon/${
                    get_property_user?.is_email_verified
                      ? "checkG.svg"
                      : "cross.svg"
                  }`}
                  title="البريد الإلكتروني"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Verified
                  imgL={"/icon/facebook.svg"}
                  imgR={`/icon/${
                    get_property_user?.facebook_id ? "checkG.svg" : "cross.svg"
                  }`}
                  title="فيسبوك"
                />
                <Verified
                  imgL={"/icon/googleIcon.svg"}
                  imgR={`/icon/${
                    get_property_user?.google_id ? "checkG.svg" : "cross.svg"
                  }`}
                  title="جوجل"
                />
              </div>
              <Link href={`/agents/${get_property_user?.id}`}>
                <div className="bg-green-600 rounded-full w-full text-white py-2 px-5 text-sm font-semibold flex justify-center text-center mt-7">
                  عقارات ({agent?.length}) من هذا{" "}
                  {get_property_user?.user_type_id === 1
                    ? "الوكيل"
                    : get_property_user?.user_type_id === 2
                    ? "السمسار"
                    : "المالك"}
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* ------------------right-side----------------- */}
        <div className="border-2 border-[#E4E7E9] rounded-[10px] p-6 order-first lg:order-last h-max lg:sticky top-12 !overflow-hidden">
          <p className="text-lg text-gray55 font-outfit pt-1">السعر</p>
          <p className="mt-5 text-2xl font-bold">
            <span className="text-golden">₪</span> <span>{price}</span>
          </p>
          <div className="grid grid-cols-2 gap-5 mt-7 pb-8 border-b-2">
            <MessageButton
              property_id={id}
              receiver_id={get_property_user?.id}
              user={user}
            />
            <ReportButton id={id} />
            <CallButton
              id={id}
              phone={`${get_country?.phone_code}${get_property_user?.phone}`}
            />
          </div>
          <div className="mt-6">
            <p className="text-lg font-medium text-center">المميزات</p>
            <div className="mt-4 bg-whiteF5 rounded-lg p-6 space-y-3">
              {get_facility?.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-gray55" />
                  <p className="text-sm text-gray55">
                    {item.f_value} {item.f_title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Ad
            adUnit={adUnitIds?.details_page_add}
            className="mt-6 w-full flex justify-center items-center"
            sizes={[300, 250]}
          />
        </div>
      </div>
      {/* ------------------more-properties----------------- */}
      <div className="my-20">
        <p className="flex justify-between items-center">
          <span className="text-2xl font-medium">عقارات أخرى</span>
          <Link href="/" className="text-green-600 text-sm font-medium">
            عرض الكل
          </Link>
        </p>
        <MoreProperties data={properties} />
      </div>
    </Container>
  );
};

export default page;
