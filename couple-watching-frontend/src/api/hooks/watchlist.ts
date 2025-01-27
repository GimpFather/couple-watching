import { useQuery } from "@tanstack/react-query";
import { GetWatchlistMovies } from "../services/firebase.service";

export enum WatchlistQueryKeys {
   GET_WATCHLIST = "GET_WATCHLIST_MOVIES",
}

export const useGetWatchlistMovies = ({ pairId }: { pairId: string }) =>
   useQuery({
      queryKey: [WatchlistQueryKeys.GET_WATCHLIST],
      queryFn: () => GetWatchlistMovies(pairId),
   });
