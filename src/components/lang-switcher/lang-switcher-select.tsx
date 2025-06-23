"use client";

import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { startTransition } from "react";

const LanguageSwitcherSelect = ({
  currentLocale,
}: {
  currentLocale: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (nextLocale: string) => {
    const pathNameWithoutLocale = pathname.replace(`/${currentLocale}`, "/");
    startTransition(() => {
      router.replace(
        { pathname: pathNameWithoutLocale, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe />
          {currentLocale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={currentLocale === "en"}
          onClick={() => handleLanguageChange("en")}
        >
          <span className="text-sm">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={currentLocale === "id"}
          onClick={() => handleLanguageChange("id")}
        >
          <span className="text-sm">Bahasa Indonesia</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcherSelect;
