import { axiosOMDBInstance } from "../axios";
import { MovieDetails } from "../models/movies.types";
import { mapKeys } from "lodash";

export const GetMovieDetails = async ({ title, type }: { title: string; type: "movie" | "series" }) => {
   const result = await axiosOMDBInstance.get<MovieDetails[]>("", {
      params: { s: title, type: type },
   });
   const transformedData = mapKeys(result.data, (_value: unknown, key: string) => key.toLowerCase());

   return transformedData;
};
