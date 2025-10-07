import { locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const Language = () => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const handleSelect = (e) => {
    const lang = e.target.value;
    startTransition(() => {
      setUserLocale(lang);
    });
  };

  return (
    <select
      className={`form-select rounded-lg border-dark focus:ring-0 focus:border-dark capitalize ${
        isPending && "pointer-events-none opacity-50"
      }`}
      defaultValue={locale}
      onChange={handleSelect}
    >
      {locales.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Language;
