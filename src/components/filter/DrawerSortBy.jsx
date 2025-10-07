import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const DrawerSortBy = ({ setIsSortShowing }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = (value) => {
    const newPathname = pathname.match(/(latest|lowest|highest|nearest)/)
      ? pathname
          .replace(/(latest|lowest|highest|nearest)/, value)
          .replace(/\/page-\d+/, "")
      : `${pathname.replace(/\/page-\d+/, "")}/${value}`;
    router.push(newPathname);
  };

  return (
    <div className="bg-white px-[18px] pb-6 pt-4 lg:pt-6 h-fit fixed top-0 w-full shadow-md" dir="rtl">
      <div className="flex items-center justify-between">
        <Image
          src={"/icon/arrow-down.svg"}
          alt=""
          width={15}
          height={15}
          className="lg:hidden rotate-90"
          onClick={() => setIsSortShowing(false)}
        />
        <span className="text-lg font-medium">ترتيب حسب</span>
        <div></div>
      </div>
      <hr className="mt-3 mb-5 -mx-6 md:hidden" />
      <div className="mt-9 font-medium text-xs">
        <label
          htmlFor="latest"
          className={`flex items-center gap-5 ${
            pathname.includes("latest") ? "text-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            id="latest"
            className="form-radio size-6 text-green-500 focus:ring-0"
            checked={pathname.includes("latest")}
            onChange={() => handleFilter("latest")}
          />
          <span>الأحدث</span>
        </label>
        <label
          htmlFor="lowest"
          className={`mt-4 flex items-center gap-5 ${
            pathname.includes("lowest") ? "text-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            id="lowest"
            className="form-radio size-6 text-green-500 focus:ring-0"
            checked={pathname.includes("lowest")}
            onChange={() => handleFilter("lowest")}
          />
          <span>الأقل سعرًا</span>
        </label>
        <label
          htmlFor="highest"
          className={`mt-4 flex items-center gap-5 ${
            pathname.includes("highest") ? "text-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            id="highest"
            className="form-radio size-6 text-green-500 focus:ring-0"
            checked={pathname.includes("highest")}
            onChange={() => handleFilter("highest")}
          />
          <span>الأعلى سعرًا</span>
        </label>
        <label
          htmlFor="nearest"
          className={`mt-4 flex items-center gap-5 ${
            pathname.includes("nearest") ? "text-green-500" : ""
          }`}
        >
          <input
            type="radio"
            name="type"
            id="nearest"
            className="form-radio size-6 text-green-500 focus:ring-0"
            checked={pathname.includes("nearest")}
            onChange={() => handleFilter("nearest")}
          />
          <span>الأقرب</span>
        </label>
      </div>
    </div>
  );
};

export default DrawerSortBy;
