import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU"},
  { code: "ro", label: "RO"},
];

export const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur sticky top-0 z-50 mb-5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Film className="w-6 h-6 text-red-600" />
          <span className="font-black text-xl tracking-wider uppercase">
            CineBrowse
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              {t("nav.about")}
            </Link>
          </nav>

          <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1">
            {LANGS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  i18n.language === lang.code
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
