import { useQuery } from "@tanstack/react-query";
import { GetWatchlistMovies, GetWatchedMovies } from "../services/firebase.service";

export enum LibraryQueryKeys {
   GET_WATCHLIST = "GET_WATCHLIST_MOVIES",
   GET_WATCHED = "GET_WATCHED_MOVIES",
}

export const useGetWatchlistMovies = ({ pairId }: { pairId: string }) =>
   useQuery({
      queryKey: [LibraryQueryKeys.GET_WATCHLIST],
      queryFn: () => GetWatchlistMovies(pairId),
   });

export const useGetWatchedMovies = ({ pairId }: { pairId: string }) =>
   useQuery({
      queryKey: [LibraryQueryKeys.GET_WATCHED],
      queryFn: () => GetWatchedMovies(pairId),
   });
