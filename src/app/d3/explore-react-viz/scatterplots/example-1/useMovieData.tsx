import { useEffect, useState } from "react";
import { csvParse } from "d3";
import { Movie } from "./types";

export const useMovieData = () => {
  const [data, setData] = useState<Array<Movie> | undefined>(undefined);

  useEffect(() => {
    fetch("/data/movies.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const data = csvParse(csvString, (row) => {
          return {
            budget: +row.budget,
            vote_average: +row.vote_average,
            revenue: +row.revenue,
            original_title: row.original_title,
          };
        });

        setData(data);
      });
  }, []);

  return data;
};
