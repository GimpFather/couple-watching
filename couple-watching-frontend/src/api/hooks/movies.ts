import { useQuery } from "@tanstack/react-query";
import { GetMovieDetails, GetSearchForMovies } from "../services/ombd.service";
import { OMDbSearchParameters } from "../models/movies.types";

export enum MoviesQueryKeys {
   GET_SEARCH = "GET_SEARCH",
   GET_DETAILS = "GET_DETAILS",
}

export const useGetSearchForMovies = ({ title, type }: OMDbSearchParameters) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_SEARCH, title],
      queryFn: () => GetSearchForMovies({ title, type }),
      enabled: false,
   });

export const useGetMovieDetails = ({ imdbId }: { imdbId: string }) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_DETAILS, imdbId],
      queryFn: () => GetMovieDetails({ imdbId }),
   });
