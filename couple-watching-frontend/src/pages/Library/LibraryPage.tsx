/* eslint-disable react-hooks/rules-of-hooks */
import { Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";
import { WatchlistFiltersInput } from "../../types/Inputs.types";
import { useGetWatchedMovies, useGetWatchlistMovies } from "../../api/hooks/library";
import WatchlistSkeleton from "../../components/Watchlist/WatchlistSkeleton";
import { useAuthContext } from "../../context/AuthProvider";
import { usePair } from "../../api/hooks/pairs";
import ViewSwitch from "../../components/Watchlist/ViewSwitch";
import React from "react";
import WatchedList from "./WatchedList";
import { Movie, WatchedMovie } from "../../types/Watchlist.types";
import EmptyStateNoData from "../../components/Watchlist/InfoSections/EmptyStateNoData";

const LibraryPage = () => {
   const { user } = useAuthContext();
   if (!user) return null;
   const [libraryMode, setLibraryMode] = React.useState<"watchlist" | "watched">("watchlist");
   const { data: pairData } = usePair(user.uid);
   const { control, watch, setValue } = useForm<WatchlistFiltersInput>();
   const { search } = watch();
   const { data: watchlistData, isLoading: isLoadingWatchlist } = useGetWatchlistMovies({ pairId: pairData?.id ?? "" });
   const { data: watchedData, isLoading: isLoadingWatched } = useGetWatchedMovies({ pairId: pairData?.id ?? "" });

   const filterMoviesBySearch = <T extends { title: string }>(
      movies: T[] | undefined,
      search: string | undefined
   ): T[] => {
      if (!movies) return [];
      const searchTerm = search?.toLowerCase() || "";
      return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm));
   };

   const filteredWatchlistData = filterMoviesBySearch<Movie>(watchlistData, search);
   const filteredWatchedData = filterMoviesBySearch<WatchedMovie>(watchedData, search);

   const isLoading = isLoadingWatchlist || isLoadingWatched;

   const clearFilters = () => setValue("search", "");

   return (
      <>
         <Stack spacing={2}>
            <PageTitle title="LIBRARY.HEADER" />
            <ViewSwitch
               activeButton={libraryMode}
               onChange={(activeButton) => {
                  clearFilters();
                  setLibraryMode(activeButton);
               }}
            />
            <Filters control={control} />
         </Stack>
         {isLoading ? (
            <Stack sx={{ marginTop: 3 }}>
               <WatchlistSkeleton />
            </Stack>
         ) : (
            <Stack sx={{ marginTop: 3 }}>
               {libraryMode === "watchlist" ? (
                  <>
                     {watchlistData && watchlistData.length ? (
                        <WatchlistList data={filteredWatchlistData} clearFilters={clearFilters} />
                     ) : (
                        <EmptyStateNoData />
                     )}
                  </>
               ) : (
                  <>
                     {watchedData && watchedData.length ? (
                        <WatchedList data={filteredWatchedData} clearFilters={clearFilters} />
                     ) : (
                        <EmptyStateNoData />
                     )}
                  </>
               )}
            </Stack>
         )}
      </>
   );
};

export default LibraryPage;
