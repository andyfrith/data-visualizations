import { useEffect, useState } from "react";
import { csvParse } from "d3";
import { Movie } from "./types";

export const useMovieData = () => {
  const [data, setData] = useState<Array<Movie> | undefined>(undefined);

  useEffect(() => {
    fetch("/data/tmdb_1000_movies_small.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString, (row) => {
          return {
            id: +row.id,
            budget: +row.budget,
            vote_average: +row.vote_average,
            vote_count: +row.vote_count,
            genres: JSON.parse(row.genres),
            primary_genre: JSON.parse(row.genres)[0]?.name,
            revenue: +row.revenue,
            original_title: row.original_title,
          };
        });

        setData(data);
      });
  }, []);

  return data;
};
