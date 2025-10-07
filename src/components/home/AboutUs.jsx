import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
// import image from '../../../public/'
const AboutUs = ({ data }) => {
  const {
    section_title,
    title,
    content,
    property_sale,
    property_rent,
    rating,
    review,
    img,
  } = data || {};
  const translations = {
    "How much is your property worth now?": "كم تبلغ قيمة عقارك الآن؟",
    "We have built our reputation as true local area experts. We have gained more knowledge about buyer interests, our neighborhood and the market than any other brand because we live locally and work for local people.":
      "لقد بنينا سمعتنا كخبراء حقيقيين في منطقتنا المحلية. اكتسبنا معرفة أعمق باهتمامات المشترين وحيّنا والسوق أكثر من أي علامة تجارية أخرى لأننا نعيش محليًا ونعمل من أجل الناس المحليين.",
    "ABOUT US": "من نحن",
    "Property Sale": "بيع العقارات",
    "Apartment Rent": "إيجار الشقق",
    "Learn More": "اعرف المزيد",
  };

  const t = (text) => translations[text] || text;

  return (
    <section data-aos="fade-up" data-aos-duration="1500" className="mt-40 lg:mt-44 lg:mb-24">
      <Container>
        <div className="grid xl:grid-cols-2 items-center">
          <div className="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${img}`}
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[335px] lg:h-[475px] object-cover rounded-[10px]"
            />
            <div className="absolute right-0 bottom-0 px-4 lg:px-8 py-3 bg-white rounded-tl-[10px] flex gap-8 items-center">
              <p className="flex gap-2 items-center text-3xl lg:text-5xl font-semibold">
                <span>{property_sale}</span>
                <span className="text-grayA6 text-xs lg:text-base font-normal">
                  {t("Property Sale")}
                </span>
              </p>
              <p className="flex gap-2 items-center text-3xl lg:text-5xl font-semibold">
                <span>{property_rent}</span>
                <span className="text-grayA6 text-xs lg:text-base font-normal">
                  {t("Apartment Rent")}
                </span>
              </p>
            </div>
            <Image
              src="https://sdmntpritalynorth.oaiusercontent.com/files/00000000-f108-6246-819a-43774795484d/raw?se=2025-10-03T23%3A56%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=9ef210b3-d593-541f-8b17-14a1a3a3c5e8&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-03T09%3A07%3A15Z&ske=2025-10-04T09%3A07%3A15Z&sks=b&skv=2024-08-04&sig=hulvvAXx4CXsRn6Zo51tOj44ui05xe1AYOG2Qtpl7KM%3D"
              alt="#"
              width={0}
              height={0}
              sizes="100vw"
              className="absolute bg-white w-[122px] lg:w-[170px] h-[166px] lg:h-[230px] shadow-2xl -top-16 lg:-top-24 left-14 lg:left-24 rounded-[10px]"
            />
          </div>
          <div className="mt-14 lg:pr-14">
            <span className="px-4 lg:px-6 py-2 lg:py-3 border border-dark rounded-[10px] text-sm lg:text-lg font-medium inline-block">
              {/* {t("ABOUT US")} */}
              معنا
            </span>
            <p className="text-3xl lg:text-5xl font-semibold mt-4">
              ما عليك غير تصور شقتك!! والمستأجر خليه على rent up
            </p>
            {/* <p className="mt-4 text-gray8c">
              {t(content)}
            </p> */}
            <Link
              href="/more/about-us"
              className="text-xs lg:text-base text-white font-medium px-8 lg:px-12 py-3 lg:py-[18px] rounded-[10px] bg-[#00B140] inline-block mt-8 lg:mt-12"
            >
              {/* {t("Learn More")} */}
              ابدأ الآن
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
