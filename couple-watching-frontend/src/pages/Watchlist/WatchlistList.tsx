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
            <MovieCard key={movie.id} data={movie} handleMarkAsWatched={() => setOpenMarkWatchedDialog(true)} />
         ))}
         <MarkWatchedDialog open={openMarkWatchedDialog} onClose={() => setOpenMarkWatchedDialog(false)} />
      </Grid>
   );
};

export default WatchlistList;
