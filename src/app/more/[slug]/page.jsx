import { getSingleMorePages } from "@/actions/actions";
import Container from "@/components/shared/Container";
import Image from "next/image";

const translations = {
  "Terms & Condition" : "الأحكام والشروط",
  "About Us": "معلومات عنا",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms & Condition" : "الأحكام والشروط",
  "If you don’t drive and you own a dog (or are planning to get one) working out how to get around with your dog can be a challenge. Public transport like busses and trains aren’t a good fit for all dogs, although many take such journeys in their stride; but even if your area is well served with such transport links, the chances are at some point they will fall short.":
    "إذا كنت لا تقود السيارة وتملك كلبًا (أو تخطط للحصول على واحد)، فقد يكون من الصعب معرفة كيفية التنقل مع كلبك. وسائل النقل العامة مثل الحافلات والقطارات ليست مناسبة لجميع الكلاب، على الرغم من أن العديد منها يتكيف مع هذه الرحلات بسهولة؛ لكن حتى لو كانت منطقتك مخدومة جيدًا بهذه الوسائل، فهناك احتمال أنها لن تكون كافية في بعض الأحيان.",
  "Even for people who do drive, you might not always be able to transport your dog in this way; if your car is out of service, for instance, or you’ve had a drink and the dog suddenly needs to see the vet. This means that you might be wondering if dogs can travel in taxis, if there is a blanket rule on this, and if black cabs or other alternative services are obliged to take dogs. This article will answer all of your questions about whether or not you can take a dog in a taxi, including black cabs, private hire cabs, Uber travel, and similar services. Read on to learn more.":
    "حتى بالنسبة للأشخاص الذين يقودون السيارة، قد لا تتمكن دائمًا من نقل كلبك بهذه الطريقة؛ إذا كانت سيارتك خارج الخدمة، أو تناولت مشروبًا فجأة ويحتاج الكلب لرؤية الطبيب البيطري. هذا يعني أنك قد تتساءل عما إذا كان يمكن للكلاب السفر في سيارات الأجرة، وإذا كان هناك قاعدة عامة لذلك، وإذا كانت سيارات الأجرة التقليدية أو الخدمات البديلة ملزمة بنقل الكلاب. ستجيب هذه المقالة على جميع أسئلتك حول إمكانية أخذ كلب في سيارة أجرة، بما في ذلك سيارات الأجرة التقليدية، وسيارات الأجرة الخاصة، وخدمات Uber وما شابهها.",
  "What we do": "ماذا نفعل",
  "When it comes to black cabs that you can hail in the street or find operating from a taxi rank without the need to pre-book your journey, whether or not you can take your dog in the taxi is at the discretion of the driver.":
    "فيما يخص سيارات الأجرة التقليدية التي يمكنك استيقافها في الشارع أو إيجادها تعمل من محطة سيارات الأجرة دون الحاجة للحجز المسبق، فإن إمكانية أخذ كلبك في السيارة تعتمد على تقدير السائق.",
  "If you’re trying to flag down a cab with your dog, the driver may not stop if they don’t like the look of your dog or don’t want to take dogs in general.":
    "إذا كنت تحاول إيقاف سيارة أجرة مع كلبك، فقد لا يتوقف السائق إذا لم يعجبه شكل كلبك أو لا يريد نقل الكلاب بشكل عام.",
  "At a taxi rank where you have to take the first taxi in the queue, if they don’t want to carry your dog, it is ok to go down the line asking others.":
    "في محطة سيارات الأجرة حيث يجب أن تأخذ أول سيارة في الصف، إذا لم يرغبوا في حمل كلبك، يمكنك الانتقال للأسفل وطلب سائقي السيارات الآخرين.",
  "Many if not most black cabs will carry dogs that are well behaved and when approached politely, but they are not obliged to":
    "الكثير من سيارات الأجرة التقليدية، إن لم يكن معظمها، ستنقل الكلاب المؤدبة عند التعامل معهم بلطف، لكنهم ليسوا ملزمين بذلك.",
  "Can you take a dog in a private hire vehicle?.": "هل يمكنك أخذ كلب في سيارة خاصة مأجورة؟",
  "Once more, taking a dog in a private hire vehicle is at the discretion of the company and/or driver.":
    "مرة أخرى، أخذ كلب في سيارة خاصة مأجورة يعتمد على تقدير الشركة و/أو السائق.",
  "You must mention that you want to take a dog when you call or book; never just assume that it will be ok. The company might need to send a certain car, or have some drivers who will take dogs and others that won’t.":
    "يجب أن تذكر أنك تريد أخذ كلب عند الاتصال أو الحجز؛ لا تفترض فقط أنه سيكون مقبولًا. قد تحتاج الشركة لإرسال سيارة معينة، أو بعض السائقين يقبلون الكلاب والآخرون لا.",
  "Whether or not they take you may also depend on the size of the dog, and you may be given directions such as keeping the dog on the lead which you should do anyway! Most private hire companies that operate a reasonable number of cars will be able to accommodate a dog with notice, but they are not obliged to.":
    "إمكانية قبولهم لك تعتمد أيضًا على حجم الكلب، وقد تتلقى تعليمات مثل إبقاء الكلب مربوطًا، وهو ما يجب فعله على أي حال! معظم شركات السيارات الخاصة التي تعمل بعدد معقول من السيارات ستتمكن من استيعاب كلب مع إشعار مسبق، لكنهم ليسوا ملزمين بذلك.",
  "Can you take a dog in an Addison Lee taxi?": "هل يمكنك أخذ كلب في سيارة أجرة Addison Lee؟",
  "Addison Lee, which serves London and surrounding areas, has an option on their mobile booking app to request a pet-friendly taxi; this enables you to ensure your dog will be transported.":
    "Addison Lee، التي تخدم لندن والمناطق المحيطة، لديها خيار في تطبيق الحجز على الهاتف لطلب سيارة صديقة للحيوانات الأليفة؛ هذا يضمن نقل كلبك.",
  "If you call or book by other means, again, you will need to ask for a dog-friendly driver. As with the prior options, Addison Lee isn’t obliged to carry a dog, but as a very large company and with prior notice, you should not have a problem.":
    "إذا اتصلت أو حجزت بطرق أخرى، مرة أخرى، ستحتاج لطلب سائق صديق للكلاب. كما هو الحال مع الخيارات السابقة، لا يُلزم Addison Lee بنقل كلب، لكن كشركة كبيرة ومع إشعار مسبق، لن تواجه مشكلة.",
  "Can you take a dog in an Uber?": "هل يمكنك أخذ كلب في Uber؟",
  "Whether or not you can take a dog in an Uber is down to the discretion of your driver, and at present, their booking app doesn’t give you an option to inform or ask about carriage for the dog.":
    "إمكانية أخذ كلب في Uber تعتمد على تقدير السائق، وفي الوقت الحالي، تطبيق الحجز لا يعطيك خيارًا لإبلاغ أو سؤال عن نقل الكلب.",
  "You need to book your journey as normal using the Uber app, then as soon as it is confirmed, call the driver you’re allocated with to check that taking your dog is ok. Not all drivers will say yes, so be prepared to try again if needed.":
    "تحتاج لحجز رحلتك كالمعتاد باستخدام تطبيق Uber، ثم بمجرد تأكيدها، اتصل بالسائق المخصص لك للتحقق من قبول أخذ كلبك. ليس كل السائقين سيوافقون، لذا كن مستعدًا للمحاولة مرة أخرى إذا لزم الأمر.",
  "Can you take a dog in a Lyft?": "هل يمكنك أخذ كلب في Lyft؟",
  "Lyft has a similar policy to Uber when it comes to whether or not a Lyft will take dogs. This is down to the discretion of the Lyft driver, and again, as soon as your Lyft is confirmed, call the driver directly to ask them.":
    "لدى Lyft سياسة مشابهة لـ Uber فيما يتعلق بإمكانية أخذ الكلاب. يعتمد ذلك على تقدير سائق Lyft، ومرة أخرى، بمجرد تأكيد رحلتك، اتصل بالسائق مباشرة للسؤال.",
  "Are any taxi or ride companies obliged to carry dogs?": "هل أي شركة سيارات أجرة أو مشاركة ملزمة بنقل الكلاب؟",
  "No taxi, ride share, private hire, or ride hailing app is obliged to carry pet dogs for any reason, even in the case of a veterinary emergency.":
    "لا أي سيارة أجرة، أو مشاركة ركاب، أو سيارة مأجورة، أو تطبيق نقل ملزم بنقل الكلاب لأي سبب، حتى في حالة الطوارئ البيطرية.",
  "However, all such services are obliged to carry assistance dogs like Guide Dogs. You’re not obliged to tell the company or driver first in this instance; but doing so can be helpful as they might be able to send a more dog-suitable vehicle.":
    "ومع ذلك، جميع هذه الخدمات ملزمة بنقل كلاب المساعدة مثل كلاب الإرشاد. لا يُطلب منك إبلاغ الشركة أو السائق مسبقًا في هذه الحالة؛ لكن القيام بذلك يمكن أن يكون مفيدًا حيث قد يتمكنون من إرسال سيارة أكثر ملاءمة للكلاب.",
  "Are there extra charges for dogs in taxis?": "هل هناك رسوم إضافية على الكلاب في سيارات الأجرة؟",
  "Some companies may charge a supplement for carrying a dog, although this is not the norm and to make such a charge, you must have this explained to you in full and agreed with you prior to the trip.":
    "قد تفرض بعض الشركات رسومًا إضافية لنقل الكلاب، على الرغم من أن هذا ليس قاعدة عامة، ولفرض هذه الرسوم، يجب أن يتم شرحها لك بالكامل والموافقة عليها قبل الرحلة.",
  "If your dog makes a mess in the vehicle (such as by toileting, throwing up, or shedding a lot of hair), you will be expected to pay the standard fee for cleaning etc., and should do so without any fuss!":
    "إذا تسبب كلبك في فوضى داخل السيارة (مثل التبول، القيء، أو تساقط الكثير من الشعر)، يُتوقع منك دفع الرسوم العادية للتنظيف وما إلى ذلك، ويجب القيام بذلك دون أي مشكلة!"
};

export const generateMetadata = async ({ params: { slug } }) => {
  const { data } = await getSingleMorePages(slug);
  return { title: data?.title };
};

const Page = async ({ params: { slug } }) => {
  const { data } = await getSingleMorePages(slug);
  const pageTitle = translations[data?.title] || data?.title;

  let pageContent = data?.content || "";
  Object.entries(translations).forEach(([key, value]) => {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    pageContent = pageContent.replace(regex, value);
  });
  pageContent = pageContent.replace(/\?\?/g, "؟");

  return (
    <Container>
      <div className="mt-8 h-36 relative rounded-[10px] border border-black/5 overflow-hidden">
        <Image src="/more-page.svg" alt="#" fill className="object-cover" />
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-3xl font-semibold">{pageTitle}</p>
        </div>
      </div>
      <div
        className="mt-20 mb-10 prose max-w-none prose-p:text-xl"
        dangerouslySetInnerHTML={{ __html: pageContent }}
      ></div>
    </Container>
  );
};

export default Page;
