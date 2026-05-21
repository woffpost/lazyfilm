import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { MovieInfo } from "../components/MovieInfo";
import { MovieRecommendations } from "../components/MovieRecommendations";
import { MovieCast } from "../components/MovieCast";

const fetchMovieDetails = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
}

const fetchRecommendations = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}/recommendations`);
  return data.results;
}

const fetchMovieCast = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data.cast.slice(0, 10);
}
 
const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });

  const { data: recommendations, isLoading: isRecLoading } = useQuery ({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchRecommendations(id!),
    enabled: !!id,
  });

  const { data: cast, isLoading: isCastLoading } = useQuery({
    queryKey: ['movie-cast', id],
    queryFn: () => fetchMovieCast(id!),
    enabled: !!id
  })

  if (isLoading) return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="h-4 w-36 bg-gray-800 rounded mb-8" />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="shrink-0 w-full md:w-64 lg:w-72 aspect-2/3 bg-gray-800 rounded-2xl" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-10 bg-gray-800 rounded-lg w-3/4" />
          <div className="h-5 bg-gray-800 rounded-lg w-1/3" />
          <div className="flex gap-3 mt-1">
            <div className="h-7 w-20 bg-gray-800 rounded-md" />
            <div className="h-7 w-14 bg-gray-800 rounded-md" />
            <div className="h-7 w-16 bg-gray-800 rounded-md" />
          </div>
          <div className="h-5 bg-gray-800 rounded w-full mt-4" />
          <div className="h-5 bg-gray-800 rounded w-full" />
          <div className="h-5 bg-gray-800 rounded w-4/5" />
          <div className="h-5 bg-gray-800 rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  if (isError) return <div className="max-w-6xl mx-auto p-6 text-gray-400">Ошибка загрузки. <Link to="/" className="text-red-500 hover:underline">Вернуться назад</Link></div>;
  if (!movie) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">← Вернуться назад</Link>
      <MovieInfo movie={movie} />
      <MovieCast cast={cast} isLoading={isCastLoading} />
      <MovieRecommendations movies={recommendations} isLoading={isRecLoading} />
    </div>
  );
};

export default MoviePage;
