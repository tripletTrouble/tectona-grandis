"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Details() {
  const [movie, setMovie] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <p className="text-center">ID film tidak ditemukan.</p>;
  }

  if (!movie) {
    axios
      .get(`http://www.omdbapi.com/?apikey=bf0d2a35&i=${id}`)
      .then((resp) => {
        setMovie(resp.data);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-[80%] max-w-screen-md mx-auto">
        <h1 className="mt-7 text-2xl font-bold mb-8">Movie Details</h1>
      {movie ? (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-5">
          {movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={400}
              height={600}
            ></Image>
          ) : (
            <div>No Poster</div>
          )}
          <div>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Title
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
                    {movie.Title}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Year
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
                    {movie.Year}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Ratings
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2 flex flex-col">
                    {movie.Ratings.length ? movie.Ratings.map((rate: any, index: any) => {
                        return <span key={index}>{rate.Source}: {rate.Value}</span>
                    }) : <span>N/A</span>}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Plot
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
                    {movie.Plot}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Released
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
                    {movie.Released}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Director
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-200 sm:col-span-2">
                    {movie.Director}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
