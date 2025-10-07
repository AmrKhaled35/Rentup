import Container from "../shared/Container";
import OurAdvantageCard from "../cards/OurAdvantageCard";
import { getOurAdvantage } from "@/actions/actions";
import Icon1 from '../../../public/logo/icon1.svg'
import Icon2 from '../../../public/logo/icon2.svg'
import Icon3 from '../../../public/logo/icon3.svg'
import Icon4 from '../../../public/logo/icon4.svg'
import Icon5 from '../../../public/logo/icon5.svg'
import Icon6 from '../../../public/logo/icon6.svg'

const OurAdvantage = async () => {
  const { data: ourAdvantage } = await getOurAdvantage();

  const translations = [
    {
      title: "الراحة",
      description:
        "استمتع بمرافق حياتية مصممة لتوفير الراحة العصرية لكل مالك منزل، وعلى بُعد خطوات من المدارس والكنائس والمستشفيات.",
    },
    {
      title: "أمان إضافي",
      description:
        "يمكنك التواصل مع المستأجرين المحتملين دون الحاجة لمشاركة رقم هاتفك. كما نلزم جميع المستخدمين بالتسجيل للتحقق من هويتهم.",
    },
    {
      title: "الفخامة",
      description:
        "اكتشف كيف نقدم أعلى معايير إدارة العقارات الاحترافية لنمنحك جميع مزايا العقار.",
    },
    {
      title: "أفضل سعر",
      description:
        "لست متأكدًا من السعر المناسب لعقارك؟ دعنا نقوم بالحسابات نيابة عنك — تواصل معنا اليوم للحصول على تقييم إيجاري مجاني لمنزلك.",
    },
    {
      title: "موقع استراتيجي",
      description:
        "موقع في قلب المدينة بالقرب من مراكز التسوق. مناسب جدًا للمناطق المحاطة بمراكز التعليم الدولية ومراكز الشركات الناشئة.",
    },
    {
      title: "الكفاءة",
      description:
        "حدد مواعيد لزيارة عدة عقارات في يوم واحد دون الحاجة للاتصال بهم واحدًا تلو الآخر. تحقق من كل شيء واعثر على أفضل العقارات للإيجار.",
    },
  ];
  const icons = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6];

  const translatedAdvantages = ourAdvantage?.map((item, index) => ({
    ...item,
    title: translations[index]?.title || item.title,
    description: translations[index]?.description || item.description,
    icon: icons[index], 
  }));

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1500"
      className="bg-whiteF5 py-[60px] lg:py-20"
    >
      <Container>
        <span className="px-4 lg:px-6 py-2 lg:py-3 border border-dark rounded-[10px] text-sm lg:text-lg font-medium inline-block">
          مميزاتنا
        </span>
        <p className="text-3xl lg:text-5xl font-semibold mt-4">
          نمنحك راحة البال
        </p>
        <div className="mt-4 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {translatedAdvantages?.map((item) => (
            <OurAdvantageCard
              key={item.id}
              title={item.title}
              des={item.description}
              src={item.icon} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurAdvantage;
