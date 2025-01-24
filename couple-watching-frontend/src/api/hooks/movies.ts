import { useQuery } from "@tanstack/react-query";
import { GetMovieDetails } from "../services/ombd.service";

export enum MoviesQueryKeys {
   GET_DETAILS = "GET_DETAILS",
}

export const useGetMovieDetails = ({ title, type }: { title: string; type: "movie" | "series" }) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_DETAILS, title],
      queryFn: () => GetMovieDetails({ title, type }),
   });
