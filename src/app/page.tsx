"use client";

import MovieCard from "@/components/movieCard";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [movies, setMovies] = useState<any[]>([]);
  const handleNext = () => {
    axios
      .get(
        `http://www.omdbapi.com/?s=${encodeURI(searchValue)}&apikey=bf0d2a35&page=${currentPage+1}`
      )
      .then((resp) => {
        if (resp.data.Response.toLowerCase() === "true") {
          const data = resp.data;

          setMovies([...movies, ...data.Search]);

          const totalPage = Math.ceil(parseInt(data.totalResults) / 10);
          
          if (currentPage+2 > totalPage) {
            setHasNext(false);
          }
        }
      })
      .catch((thrown) => {
        console.log(thrown);
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentPage(currentPage+1)
      });
  };

  useEffect(() => {
    setIsLoading(false);
    setHasNext(false);
    setMovies([]);

    if (searchValue.length) {
      setIsLoading(true);
      const getData = setTimeout(() => {
        axios
          .get(
            `http://www.omdbapi.com/?s=${encodeURI(
              searchValue
            )}&apikey=bf0d2a35`
          )
          .then((resp) => {
            if (resp.data.Response.toLowerCase() === "true") {
              const data = resp.data;

              setMovies(data.Search);
              setCurrentPage(1);

              if (data.totalResults > 10) {
                setHasNext(true);
              }
            }else {
              setHasNext(false);
            }
          })
          .catch((thrown) => {
            console.log(thrown);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 750);

      return () => {
        clearTimeout(getData);
      };
    }
  }, [searchValue]);

  return (
    <main className="flex min-h-screen flex-col mt-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 font-bold text-2xl">Pencarian Film</h1>
        <input
          type="text"
          placeholder="Tulis judul film ..."
          className="py-4 px-3 text-lg bg-transparent border border-white rounded-lg w-[90vw] md:w-[60%]"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="mt-8">
        {isLoading ? (
          <p className="text-center">Searching film ...</p>
        ) : movies.length === 0 ? (
          <p className="text-center">Film tidak ditemukan</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 w-[90vw] lg:grid-cols-5 gap-5 mx-auto">
            {movies.map((movie, index) => {
              return <MovieCard key={index} movie={movie}></MovieCard>;
            })}
          </div>
        )}
        <div className="text-center mt-5">
          {hasNext ? (
            <button onClick={() => handleNext()} className="py-2 px-5 border rounded-lg cursor-pointer">
              Load More ...
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
