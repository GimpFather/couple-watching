import { Grid2 as Grid } from "@mui/material";
import { Movie } from "../../types/Watchlist.types";
import React, { Suspense } from "react";
import MarkWatchedDialog from "../../components/Watchlist/MarkWatchedDialog";
import WatchlistSkeleton from "../../components/Watchlist/WatchlistSkeleton";
import EmptyStateFilters from "../../components/Watchlist/InfoSections/EmptyStateFilters";

const MovieCard = React.lazy(() => import("../../components/Watchlist/MovieCard/MovieCard"));

type WatchlistListProps = {
   data: Movie[];
   clearFilters: () => void;
};

const WatchlistList = ({ data, clearFilters }: WatchlistListProps) => {
   const [openMarkWatchedDialog, setOpenMarkWatchedDialog] = React.useState<boolean>(false);

   return (
      <>
         {data && data.length ? (
            <Grid container spacing={3}>
               {data.map((movie) => (
                  <React.Fragment key={movie.id}>
                     <Suspense fallback={<WatchlistSkeleton />}>
                        <MovieCard data={movie} handleMarkAsWatched={() => setOpenMarkWatchedDialog(true)} />
                     </Suspense>
                     {openMarkWatchedDialog && (
                        <MarkWatchedDialog
                           open={openMarkWatchedDialog}
                           onClose={() => setOpenMarkWatchedDialog(false)}
                           data={movie}
                        />
                     )}
                  </React.Fragment>
               ))}
            </Grid>
         ) : (
            <EmptyStateFilters clearFilters={clearFilters} />
         )}
      </>
   );
};

export default WatchlistList;
