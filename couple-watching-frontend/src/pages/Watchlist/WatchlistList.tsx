import { Grid2 as Grid } from "@mui/material";
import { Movie } from "../../types/Watchlist.types";
import React from "react";
import MarkWatchedDialog from "../../components/Watchlist/MarkWatchedDialog";
import MovieCard from "../../components/Watchlist/MovieCard/MovieCard";

type WatchlistListProps = {
   data: Movie[];
};

const WatchlistList = ({ data }: WatchlistListProps) => {
   const [openMarkWatchedDialog, setOpenMarkWatchedDialog] = React.useState<boolean>(false);

   return (
      <Grid container spacing={2}>
         {data.map((movie) => (
            <React.Fragment key={movie.id}>
               <MovieCard data={movie} handleMarkAsWatched={() => setOpenMarkWatchedDialog(true)} />
               <MarkWatchedDialog
                  open={openMarkWatchedDialog}
                  onClose={() => setOpenMarkWatchedDialog(false)}
                  data={movie}
               />
            </React.Fragment>
         ))}
      </Grid>
   );
};

export default WatchlistList;
