import dayjs from "dayjs";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { getFooter, getSocial } from "@/actions/actions";
import { getTranslations } from "next-intl/server";
import Logo from "../../../public/logo/Logo.png";
import PalLogo from "../../../public/palcode.jpeg"; 

const properties = [
  {
    label: "الأسئلة الشائعة",
    link: "/faqs",
  },
  {
    label: "اتصل بنا",
    link: "/contact",
  },
  // {
  //   label: "المدونة",
  //   link: "/blogs",
  // },
];

const translations = {
  "Terms & Condition": "الأحكام والشروط",
  "About Us": "معلومات عنا",
  "Privacy Policy": "سياسة الخصوصية",
  "Affiliate Program Privacy": "برنامج Affiliate",
  "FAQs": "الأسئلة الشائعة",
  "Contact": "اتصل بنا",
  "Blog": "المدونة",
  "Get Support": "الحصول على الدعم",
  "All Pages": "كل الصفحات",
  "Download App": "تحميل التطبيق"
};

const Footer = async ({ links }) => {
  const [{ data: socials }, { data: footer }] = await Promise.all([
    getSocial(),
    getFooter(),
  ]);
  // const t = await getTranslations("footer");
  const t3 = (text) => translations[text] || text;

  return (
    <footer className="bg-[#1c1c1c] text-[#00B140]">
      <Container>
        <div className="grid grid-cols-10 gap-y-12 lg:gap-6 py-16 border-b border-gray-700">
          <div className="col-span-10 lg:col-span-4 mb-9">
            <Image
              src={Logo}
              alt="الشعار"
              width={200}
              height={45}
              className="mb-10"
            />
            <p className="text-sm text-grayA1 mt-8">دعم العملاء:</p>
            <p className="text-lg font-medium">{footer?.number}</p>
            <p className="my-3">
              {footer?.address?.split(".")[0]} <br />{" "}
              {footer?.address?.split(".")[1]}
            </p>
            <Link
              href={`mailto:${footer?.mail}`}
              className="font-medium hover:text-[#00B140] text-white"
            >
              {footer?.mail}
            </Link>

            <div className="mt-6 flex items-center gap-12">
              {socials?.map((item) => (
                <Link href={item.link} key={item.id}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.icon}`}
                    alt="#"
                    width={24}
                    height={27}
                  />
                </Link>
              ))}
            </div>
            <p className="text-sm text-grayA1 mt-5">
              © {dayjs().year()}. {footer?.copyright}
            </p>
          </div>

          <div className="col-span-5 lg:col-span-2">
            <p className="text-[#00B140] text-lg font-medium">
              {t3("الحصول على الدعم")}
            </p>
            <ul className="mt-5 lg:mt-7 space-y-3">
              {properties?.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="text-white hover:text-[#00B140]"
                  >
                    {t3(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-5 lg:col-span-2">
            <p className="text-[#00B140] text-lg font-medium">
              {t3("كل الصفحات")}
            </p>
            <ul className="mt-5 lg:mt-7 space-y-3">
              {links?.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/more/${item?.slug ? item?.slug : "about-us"}`}
                    className="text-white hover:text-[#00B140]"
                  >
                    {t3(item?.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-10 lg:col-span-2">
            <p className="text-[#00B140] text-lg font-medium">
              {t3("تحميل التطبيق")}
            </p>
            <p className="text-sm text-grayA1 mt-5 lg:mt-7">
              أحب هذا الموقع العقاري! المنصة سهلة الاستخدام، ووجدت بسهولة
              العقار المثالي الذي كنت أبحث عنه. القوائم مفصلة وعالية الجودة.
            </p>
            <Link href={footer?.google_play}>
              <Image
                src="/footer/google-play.png"
                alt="#"
                width={175}
                height={68}
                className="mt-6"
              />
            </Link>
            <Link href={footer?.app_store}>
              <Image
                src="/footer/app-store.png"
                alt="#"
                width={175}
                height={68}
                className="mt-6"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 py-6 text-sm text-white">
          <span className="text-[18px]">Development by Pal Code</span>
          <Link
            href="https://palcode.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#00B140]"
          >
            <Image
              src={PalLogo}
              alt="Pal Code"
              width={60}
              height={30}
              className="object-contain rounded-lg"
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
