"use client";

import MovieDetail from "@/components/movieDetail";
import { Suspense } from "react";

export default function Details() {
  return (
    <>
      <Suspense>
        <MovieDetail></MovieDetail>
      </Suspense>
    </>
  );
}
