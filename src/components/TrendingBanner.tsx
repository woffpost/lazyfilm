import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/axios";
import { TMDB_BACKDROP } from "@/constants/tmdb";

const TMDB_LANG: Record<string, string> = {
  en: "en-US",
  ru: "ru-RU",
  ro: "ro-RO",
};

const fetchTrending = async (language: string) => {
  const { data } = await api.get("/trending/movie/day", {
    params: { language },
  });
  return data.results[0];
};

export const TrendingBanner = () => {
  const { t, i18n } = useTranslation();
  const tmdbLang = TMDB_LANG[i18n.language] ?? "en-US";

  const { data: movie, isLoading } = useQuery({
    queryKey: ["trending-banner", tmdbLang],
    queryFn: () => fetchTrending(tmdbLang),
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <div className="w-full h-105 sm:h-130 bg-gray-900 animate-pulse mb-16" />
    );
  }

  if (!movie?.backdrop_path) return null;

  return (
    <div className="relative w-full h-105 sm:h-130 overflow-hidden mb-16">
      <img
        src={`${TMDB_BACKDROP}${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* gradients */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-gray-900/10" />
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 via-gray-900/40 to-transparent" />

      {/* content */}
      <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {t("trending.label")}
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight drop-shadow-lg">
          {movie.title}
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-yellow-500 text-black font-black px-2.5 py-0.5 rounded text-xs">
            IMDb {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-gray-300 text-sm">
            {movie.release_date?.split("-")[0]}
          </span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-6 max-w-lg">
          {movie.overview}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-xl"
        >
          {t("trending.cta")} →
        </Link>
      </div>
    </div>
  );
};
