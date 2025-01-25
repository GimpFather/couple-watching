import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMovieDetails, GetSearchForMovies } from "../services/ombd.service";
import { OMDbSearchParameters } from "../models/movies.types";
import { PostMovieToWatchlist } from "../services/firebase.service";
import { Movie } from "../../types/Watchlist.types";

export enum MoviesQueryKeys {
   GET_SEARCH = "GET_SEARCH",
   GET_DETAILS = "GET_DETAILS",
   POST_TO_WATCHLIST = "POST_TO_WATCHLIST",
}

export const useGetSearchForMovies = ({ title, type }: OMDbSearchParameters) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_SEARCH, title],
      queryFn: () => GetSearchForMovies({ title, type }),
      enabled: false,
   });

export const useGetMovieDetails = ({ imdbId, enabled = true }: { imdbId: string; enabled?: boolean }) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_DETAILS, imdbId],
      queryFn: () => GetMovieDetails({ imdbId }),
      enabled: enabled,
   });

export const usePostToWatchlist = () => {
   return useMutation<void, Error, Movie>({
      mutationFn: (newMovie) => PostMovieToWatchlist(newMovie),
   });
};
