import { tmdb } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

interface GenrePageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ name: string; type: "movie" | "tv" }>;
}

export async function generateMetadata({ searchParams }: GenrePageProps) {
    const { name, type } = await searchParams;
    const genreName = name || "Genre";
    const typeLabel = type === "tv" ? "TV Shows" : "Movies";
    
    return {
        title: `${genreName} ${typeLabel} | Meowly`,
        description: `Browse the best ${genreName} ${typeLabel.toLowerCase()} on Meowly. Watch now for free in HD.`,
    };
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const genreId = resolvedParams.id;
    const genreName = resolvedSearchParams.name || "Genre";
    const type = resolvedSearchParams.type || "movie";

    // Fetch multiple pages so users can explore more content beyond the first 20 results
    const movies = await tmdb.getDiscoverPages(type, { genreId }, 5);

    return (
        <main className="min-h-screen bg-black pt-24 sm:pt-28 md:pt-32 pb-20 overflow-x-hidden">
            <div className="px-4 sm:px-8 md:px-12">
                <div className="flex items-center gap-4 mb-12 flex-wrap">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        <span className="text-accent">{genreName}</span> {type === "movie" ? "Movies" : "TV Shows"}
                    </h1>
                    {movies && movies.length > 0 && (
                        <span className="text-sm text-gray-500 font-medium">
                            {movies.length}+ titles
                        </span>
                    )}
                </div>

                {movies && movies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={`${movie.id}-${movie.media_type}`} movie={movie} isFluid={true} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <p className="text-xl">No content found for this category.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
