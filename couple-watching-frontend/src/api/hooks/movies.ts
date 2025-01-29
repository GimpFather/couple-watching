import { useMutation, useQuery } from "@tanstack/react-query";
import { GetMovieDetails, GetSearchForMovies } from "../services/ombd.service";
import { OMDbSearchParameters } from "../models/movies.types";
import { DeleteMovieFromWatchlist, PostMovieAsWatched, PostMovieToWatchlist } from "../services/firebase.service";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";

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

export const useGetMovieDetails = ({ imdbId, enabled = true }: { imdbId: string; enabled?: boolean }) =>
   useQuery({
      queryKey: [MoviesQueryKeys.GET_DETAILS, imdbId],
      queryFn: () => GetMovieDetails({ imdbId }),
      enabled: enabled,
   });

export const usePostToWatchlist = () => {
   return useMutation<void, Error, { newMovie: Movie; pairId: string }>({
      mutationFn: ({ newMovie, pairId }) => PostMovieToWatchlist(newMovie, pairId),
   });
};

export const usePostMovieAsWatched = () => {
   return useMutation<void, Error, { newMovie: WatchedMovie; pairId: string }>({
      mutationFn: ({ newMovie, pairId }) => PostMovieAsWatched(newMovie, pairId),
   });
};

export const useDeleteMovieFromWatchlist = () => {
   return useMutation<void, Error, { movieId: string; pairId: string }>({
      mutationFn: ({ movieId, pairId }) => DeleteMovieFromWatchlist(movieId, pairId),
   });
};
