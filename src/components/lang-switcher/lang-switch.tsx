import { useLocale } from "next-intl";
import LanguageSwitcherSelect from "./lang-switcher-select";

export const LanguageSwitcher = () => {
  const locale = useLocale();

  return <LanguageSwitcherSelect currentLocale={locale} />;
};
