import { Card, Stack, Typography } from "@mui/material";
import { Movie } from "../../../types/Watchlist.types";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FlipIcon from "./FlipIcon";
import { FormattedMessage } from "react-intl";
import { useDeleteMovieFromWatchlist } from "../../../api/hooks/movies";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../General/Button";
import RatingChip from "../../General/Chips/RatingChip";
import DurationChip from "../../General/Chips/DurationChip";

type BackCardProps = {
   movie: Movie;
   handleFlip: () => void;
   handleMarkAsWatched: () => void;
};

const BackCard = ({ movie, handleFlip, handleMarkAsWatched }: BackCardProps) => {
   const queryClient = useQueryClient();
   const { mutate: deleteMutate } = useDeleteMovieFromWatchlist();

   const notifySuccess = () => toast("Nice! That film is officially trashed. 🗑️");
   const notifyError = () => toast("Oops! Something went wrong. 😢");

   const handleDeleteMovie = () => {
      deleteMutate(movie.id, {
         onSuccess: () => {
            notifySuccess();
            queryClient.invalidateQueries({ queryKey: ["GET_WATCHLIST_MOVIES"] });
         },
         onError: (e) => {
            console.log(e.message);
            notifyError();
         },
      });
   };
   return (
      <Card
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            padding: 2,
            width: 350,
            height: 500,
            borderRadius: 4,
            backgroundColor: "background.paper",
            overflow: "hidden",
            boxShadow: 3,
            transform: "rotateY(180deg)",
         }}
      >
         <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack spacing={2}>
               <Typography
                  color="primary"
                  variant="h4"
                  sx={{
                     fontWeight: "bold",
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     WebkitLineClamp: 3,
                     textOverflow: "ellipsis",
                  }}
               >
                  {movie.title}
               </Typography>
               <Stack spacing={1} direction="row">
                  <RatingChip rate={movie.imdbReview} />
                  <DurationChip duration={`${movie.duration} min`} />
               </Stack>
               <Typography>
                  {movie.director} ({movie.productionYear})
               </Typography>
               <Typography
                  variant="body1"
                  sx={{
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     WebkitLineClamp: 8,
                     textOverflow: "ellipsis",
                  }}
               >
                  {movie.plot}
               </Typography>
               <Stack alignItems="center" direction="row" spacing={1}>
                  {movie.genre.map((genre, index) => (
                     <Typography key={index} variant="body1">
                        #{genre}
                     </Typography>
                  ))}
               </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
               <FlipIcon handleClick={() => handleFlip()} dark />
               <Button startIcon={<BookmarkAddedIcon />} onClick={() => handleMarkAsWatched()} dark>
                  <FormattedMessage id="WATCHLIST.CARD.BUTTON.PRIMARY" />
               </Button>
               <Button startIcon={<BookmarkRemoveIcon />} onClick={() => handleDeleteMovie()} dark>
                  <FormattedMessage id="WATCHLIST.CARD.BUTTON.SECONDARY" />
               </Button>
            </Stack>
         </Stack>
      </Card>
   );
};

export default BackCard;
