import { Grid2 as Grid } from "@mui/material";
import { WatchedMovie } from "../../types/Watchlist.types";
import React, { Suspense } from "react";
import WatchlistSkeleton from "../../components/Library/WatchlistSkeleton";
import EmptyStateFilters from "../../components/Library/InfoSections/EmptyStateFilters";
import ShowOpinionDialog from "../../components/Library/Dialog/ShowOpinionDialog";

const MovieCard = React.lazy(() => import("../../components/Library/MovieCard/MovieCard"));

type WatchedListProps = {
   data: WatchedMovie[];
   clearFilters: () => void;
};

const WatchedList = ({ data, clearFilters }: WatchedListProps) => {
   const [openShowOpinionDialog, setOpenShowOpinionDialog] = React.useState<boolean>(false);

   return (
      <>
         {data && data.length ? (
            <Grid container spacing={3}>
               {data.map((movie) => (
                  <React.Fragment key={movie.id}>
                     <Suspense fallback={<WatchlistSkeleton />}>
                        <MovieCard
                           data={movie}
                           handleMarkAsWatched={() => setOpenShowOpinionDialog(true)}
                           watched={true}
                        />
                     </Suspense>
                     {openShowOpinionDialog && (
                        <ShowOpinionDialog
                           open={openShowOpinionDialog}
                           onClose={() => setOpenShowOpinionDialog(false)}
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

export default WatchedList;
