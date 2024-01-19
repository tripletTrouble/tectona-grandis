import Image from "next/image"

export default function MovieCard({movie} : Readonly<{movie: any}>) {
    return <a href={`/details?id=${movie.imdbID}`} className="flex flex-col justify-between p-3 border rounded-lg relative">
        {movie.Poster !== 'N/A' ? <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={400}
            className="rounded-md"
        ></Image> : <div className="text-center">No Poster</div>}
        <p className="font-bold mt-4">{movie.Title} ({movie.Year})</p>
        <span className="absolute top-2 left-3 py-1 px-2 rounded bg-amber-500 text-xs font-bold">{movie.Type}</span>
    </a>
}