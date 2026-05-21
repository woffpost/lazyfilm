import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Film } from "lucide-react";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-[120px] font-black text-gray-800 leading-none select-none mb-2">
        404
      </p>
      <Film className="w-10 h-10 text-gray-700 mb-6" />
      <h1 className="text-2xl font-bold text-white mb-3">{t("notFound.title")}</h1>
      <p className="text-gray-500 mb-8 max-w-xs">{t("notFound.subtitle")}</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
      >
        {t("notFound.cta")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
