import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { tmdb } from "@/lib/tmdb";
import RecentlyPlayedRow from "@/components/RecentlyPlayedRow";
import InfiniteGenres from "@/components/InfiniteGenres";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meowly.qzz.io",
  },
};

export default async function Home() {
  const [
    trending,
    popularMovies,
    popularTV,
    topRated,
    actionMovies,
    comedyMovies,
  ] = await Promise.all([
    tmdb.getTrending("all"),
    tmdb.getPopular("movie"),
    tmdb.getPopular("tv"),
    tmdb.getTopRated("movie"),
    tmdb.getDiscover("movie", { genreId: "28" }), // Action
    tmdb.getDiscover("movie", { genreId: "35" }), // Comedy
  ]);

  // Fetch logos for the top 10 for the Hero
  const heroMovies = await Promise.all(
    trending.slice(0, 10).map(async (m) => {
      try {
        const details = await tmdb.getDetails(m.media_type as any, m.id.toString());
        return { ...m, logos: details.images?.logos || [] };
      } catch (e) {
        return m;
      }
    })
  );

  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      <h1 className="sr-only">Xeonflix | Watch Movies & TV Shows Online Free</h1>

      {heroMovies && heroMovies.length > 0 && <Hero movies={heroMovies as any} />}

      <div className="relative z-40 mt-4 md:-mt-10 space-y-6 md:space-y-12 transition-all duration-500">
        <RecentlyPlayedRow />
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular Movies" movies={popularMovies} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="TV Shows" movies={popularTV} />
        <MovieRow title="Action Blockbusters" movies={actionMovies} />
        <MovieRow title="Comedy Hits" movies={comedyMovies} />
        <InfiniteGenres />
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4 pb-10 mt-20 md:mt-32">
        <h2 className="text-2xl font-bold text-white">Join Millions of Movie Lovers</h2>
        <p className="text-gray-400">
          Start your cinematic journey with Xeonflix today. Discover new favorites, build your watchlist, and enjoy a premium streaming experience that respects your time and your privacy.
        </p>
      </div>
    </main>
  );
}
