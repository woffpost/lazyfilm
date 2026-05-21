import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import api from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieSkeleton } from "../components/MovieSkeleton";
import { MovieQuiz } from "@/components/MovieQuiz";

import { Film, Sparkles, RefreshCw, Globe } from "lucide-react";
import { TMDB_IMAGE_W200 } from "@/constants/tmdb";
import { API_URL } from "@/constants/tmdb";

import { TrendingBanner } from "@/components/TrendingBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface QuizAnswers {
  mood: string;
  timing: string;
  language: string;
  custom_wish?: string;
  ui_language?: string;
}

interface EnrichedAiMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  ai_reason: string;
  [key: string]: unknown;
}

const fetchAiRecommendationsWithDetails = async (
  quizAnswers: QuizAnswers
): Promise<EnrichedAiMovie[]> => {
  const { data: aiRecommendations } = await axios.post<
    { title: string; year: number; reason: string }[]
  >(`${API_URL}/api/ai/recommend/`, quizAnswers);

  const enrichedMovies = await Promise.all(
    aiRecommendations.map(async (rec) => {
      try {
        const cleanTitle = rec.title.replace(/['"«»]/g, "").trim();
        const { data: searchData } = await api.get("/search/movie", {
          params: { query: cleanTitle, year: rec.year },
        });
        if (searchData.results && searchData.results.length > 0) {
          const firstMovie = searchData.results[0];
          const { data: tmdbDetails } = await api.get(`/movie/${firstMovie.id}`);
          return { ...tmdbDetails, ai_reason: rec.reason } as EnrichedAiMovie;
        }
        return null;
      } catch (err) {
        console.error("TMDB lookup error:", err);
        return null;
      }
    })
  );

  return enrichedMovies.filter((movie): movie is EnrichedAiMovie => movie !== null);
};

const fetchGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data.genres;
};

const SEO_DESCRIPTIONS: Record<string, string> = {
  en: "CineBrowse — AI-powered movie recommendations. Tell Claude your mood and get 3 perfect films for tonight. Browse by genre, rating, and release date.",
  ru: "CineBrowse — рекомендации фильмов на основе ИИ. Расскажи Claude о настроении и получи 3 идеальных фильма на вечер.",
  ro: "CineBrowse — recomandări de filme bazate pe AI. Spune-i lui Claude starea ta și primești 3 filme perfecte pentru diseară.",
};

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"browse" | "ai">("ai");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  const { ref, inView } = useInView();

  const seoDescription =
    SEO_DESCRIPTIONS[i18n.language] ?? SEO_DESCRIPTIONS.en;

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const {
    data: browseData,
    isLoading: isBrowseLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", debouncedSearchTerm, selectedGenre, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      if (debouncedSearchTerm) {
        const { data } = await api.get("/search/movie", {
          params: { query: debouncedSearchTerm, page: pageParam },
        });
        return data;
      }
      const { data } = await api.get("/discover/movie", {
        params: {
          with_genres: selectedGenre,
          sort_by: sortBy,
          page: pageParam,
        },
      });
      return data;
    },
    enabled: activeTab === "browse",
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });

  const aiMutation = useMutation({
    mutationKey: ["aiRecommendations"],
    mutationFn: fetchAiRecommendationsWithDetails,
  });

  const browseMovies =
    browseData?.pages.flatMap((page) => page.results || []) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>CineBrowse — AI Movie Recommendations</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content="CineBrowse — AI Movie Recommendations" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="CineBrowse — AI Movie Recommendations" />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>

      {/* TRENDING BANNER — full width */}
      <TrendingBanner />

      <div className="max-w-6xl mx-auto px-4">
        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <Sparkles className="w-5 h-5 text-red-400" />, titleKey: "features.ai.title", descKey: "features.ai.desc" },
            { icon: <Film className="w-5 h-5 text-red-400" />, titleKey: "features.browse.title", descKey: "features.browse.desc" },
            { icon: <Globe className="w-5 h-5 text-red-400" />, titleKey: "features.lang.title", descKey: "features.lang.desc" },
          ].map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="bg-gray-800/40 border border-gray-800 rounded-2xl p-5 flex gap-4">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-red-950/50 border border-red-900/40 flex items-center justify-center">
                {icon}
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">{t(titleKey)}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide uppercase transition-all cursor-pointer ${
              activeTab === "ai"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30 ring-2 ring-red-500/50"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <Sparkles className="w-4 h-4" /> {t("tabs.ai")}
          </button>
          <button
            onClick={() => setActiveTab("browse")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide uppercase transition-all cursor-pointer ${
              activeTab === "browse"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30 ring-2 ring-red-500/50"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <Film className="w-4 h-4" /> {t("tabs.browse")}
          </button>
        </div>

        {/* AI TAB */}
        {activeTab === "ai" && (
          <div>
            {!aiMutation.data && !aiMutation.isPending && (
              <MovieQuiz
                onComplete={(answers) => aiMutation.mutate({ ...answers, ui_language: i18n.language })}
                isLoading={false}
              />
            )}

            {aiMutation.isPending && (
              <MovieQuiz onComplete={() => {}} isLoading={true} />
            )}

            {aiMutation.data && !aiMutation.isPending && (
              <div className="animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                  <h2 className="text-3xl font-black flex items-center gap-2">
                    <Sparkles className="text-yellow-500 fill-yellow-500 w-7 h-7" />
                    {t("results.title")}
                  </h2>
                  <button
                    onClick={() => aiMutation.reset()}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> {t("results.reset")}
                  </button>
                </div>

                {aiMutation.data.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <p>{t("results.empty")}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aiMutation.data.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-gray-800/40 border border-gray-800 rounded-3xl overflow-hidden flex flex-col shadow-xl"
                      >
                        <Link
                          to={`/movie/${movie.id}`}
                          className="block relative overflow-hidden aspect-2/3 group"
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={`${TMDB_IMAGE_W200}/${movie.poster_path}`}
                            alt={movie.title}
                          />
                          <div className="absolute top-4 right-4 bg-yellow-500 text-black font-black px-2.5 py-1 rounded-md text-xs shadow-md">
                            IMDb{" "}
                            {movie.vote_average
                              ? movie.vote_average.toFixed(1)
                              : "0.0"}
                          </div>
                        </Link>
                        <div className="p-5 flex-1 flex flex-col">
                          <Link
                            to={`/movie/${movie.id}`}
                            className="font-bold text-xl hover:text-red-500 transition-colors block line-clamp-1 mb-1"
                          >
                            {movie.title}
                          </Link>
                          <p className="text-xs text-gray-500 mb-4">
                            {t("results.meta", {
                              year: movie.release_date
                                ? movie.release_date.split("-")[0]
                                : "----",
                              runtime: movie.runtime,
                            })}
                          </p>
                          <div className="bg-gray-900/60 border border-gray-700/30 p-4 rounded-2xl flex-1 text-sm text-gray-300 leading-relaxed italic relative">
                            <span className="text-2xl text-red-500 font-serif absolute -top-2 left-2">
                              "
                            </span>
                            <p className="pt-1">{movie.ai_reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* BROWSE TAB */}
        {activeTab === "browse" && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder={t("browse.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 rounded-lg bg-gray-800 border-gray-700 focus:border-red-500 outline-none transition-all text-white"
              />
            </div>

            <div className="mb-10 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 px-1">
                  <Film className="w-3.5 h-3.5 text-red-500" />
                  {t("browse.genre.label")}
                </label>
                <Select
                  value={selectedGenre ? String(selectedGenre) : "all"}
                  onValueChange={(value) => {
                    setSearchTerm("");
                    setSelectedGenre(value === "all" ? null : Number(value));
                  }}
                >
                  <SelectTrigger className="w-full h-11 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-red-500/40 focus:border-red-500 hover:border-gray-600 transition-all duration-200 px-4 text-sm font-medium cursor-pointer flex justify-between items-center outline-none">
                    <SelectValue placeholder={t("browse.genre.label")} />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl p-1.5 min-w-(--radix-select-trigger-width)"
                    position="popper"
                    sideOffset={6}
                  >
                    <SelectItem
                      value="all"
                      className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors"
                    >
                      {t("browse.genre.all")}
                    </SelectItem>
                    {genres?.map((genre: { id: number; name: string }) => (
                      <SelectItem
                        key={genre.id}
                        value={String(genre.id)}
                        className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors"
                      >
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 px-1">
                  <span className="text-red-500">↕</span>
                  {t("browse.sort.label")}
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full h-11 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-red-500/40 focus:border-red-500 hover:border-gray-600 transition-all duration-200 px-4 text-sm font-medium cursor-pointer flex justify-between items-center outline-none">
                    <SelectValue placeholder={t("browse.sort.label")} />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl p-1.5 min-w-(--radix-select-trigger-width)"
                    position="popper"
                    sideOffset={6}
                  >
                    <SelectItem
                      value="popularity.desc"
                      className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors"
                    >
                      {t("browse.sort.popularity")}
                    </SelectItem>
                    <SelectItem
                      value="vote_average.desc"
                      className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors"
                    >
                      {t("browse.sort.rating")}
                    </SelectItem>
                    <SelectItem
                      value="primary_release_date.desc"
                      className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors"
                    >
                      {t("browse.sort.date")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isBrowseLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <MovieSkeleton key={i} />
                ))}
              </div>
            ) : browseMovies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-500">
                  <Film className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("browse.empty.title")}
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                  {t("browse.empty.subtitle", { term: searchTerm })}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {browseMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="group bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      <img
                        className="w-full h-auto"
                        src={`${TMDB_IMAGE_W200}/${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="p-4">
                        <p className="font-semibold text-lg truncate group-hover:text-red-500 transition-colors">
                          {movie.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {movie.release_date
                            ? movie.release_date.split("-")[0]
                            : "----"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {isFetchingNextPage && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <MovieSkeleton key={i} />
                    ))}
                  </div>
                )}
                <div ref={ref} className="h-10 w-full" />
                {!hasNextPage && browseMovies.length > 0 && (
                  <p className="text-sm italic text-gray-500 text-center mt-10 pb-10">
                    {t("browse.end")}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
