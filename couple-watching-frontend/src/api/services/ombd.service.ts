import { axiosOMDBInstance } from "../axios";
import { MovieDetails, MovieDetailsCapital, MovieDetailsResponse } from "../models/movies.types";

export const GetMovieDetails = async ({ title, type }: { title: string; type: "movie" | "series" }) => {
   const result = await axiosOMDBInstance.get<MovieDetailsResponse>("", {
      params: { s: title, type: type },
   });
   const transformedData: MovieDetails[] = result.data.Search.map((item: MovieDetailsCapital) => ({
      ...item,
      id: item.imdbId,
      title: item.Title,
      plot: item.Plot,
      cover: item.Poster,
      productionYear: item.Year,
   }));

   return transformedData;
};
