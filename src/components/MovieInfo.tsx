import { TMDB_IMAGE_W500 } from "@/constants/tmdb";

interface MovieGenres {
  name: string;
}
interface MovieInfoProps {
  movie: {
    title: string;
    budget: number;
    release_date: string;
    tagline: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
    genres: MovieGenres[];
  };
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Poster — fixed width + aspect ratio, no stretch */}
      <div className="shrink-0 w-full md:w-64 lg:w-72">
        <img
          src={`${TMDB_IMAGE_W500}/${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover rounded-2xl shadow-2xl"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
            {movie.title}{" "}
            <span className="text-gray-400 text-2xl font-normal">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>
          {movie.tagline && (
            <p className="text-lg text-gray-400 italic mb-5">{movie.tagline}</p>
          )}

          <div className="flex flex-wrap gap-3">
            <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md text-sm">
              IMDb {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded-md text-sm">
              {movie.release_date ? movie.release_date.split("-")[0] : "—"}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded-md text-sm">
              {movie.runtime} min
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-200">О фильме</h3>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-gray-800">
          <div>
            <p className="text-gray-500 mb-1">Жанры</p>
            <p className="text-gray-200">
              {movie.genres?.map((g) => g.name).join(", ") || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Бюджет</p>
            <p className="text-gray-200">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
