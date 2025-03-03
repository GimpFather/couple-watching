import { Grid2 as Grid } from "@mui/material";
import { Movie } from "../../types/Watchlist.types";
import React, { Suspense } from "react";
import MarkWatchedDialog from "../../components/Library/Dialog/MarkWatchedDialog";
import WatchlistSkeleton from "../../components/Library/WatchlistSkeleton";
import EmptyStateFilters from "../../components/Library/InfoSections/EmptyStateFilters";

const MovieCard = React.lazy(() => import("../../components/Library/MovieCard/MovieCard"));

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
                        <MovieCard
                           data={movie}
                           handleMarkAsWatched={() => setOpenMarkWatchedDialog(true)}
                           watched={false}
                        />
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
