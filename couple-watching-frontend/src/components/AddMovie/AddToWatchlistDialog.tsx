/* eslint-disable react-hooks/rules-of-hooks */
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Stack,
   Typography,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useGetMovieDetails, usePostToWatchlist } from "../../api/hooks/movies";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { toast } from "react-toastify";
import AddToWatchlistDialogSkeleton from "./AddToWatchlistDialogSkeleton";
import Button from "../General/Button";
import { ADD_MOVIE_SUBTITLE } from "../../constants/ADD_MOVIE_SUBTITLE";
import RatingChip from "../General/Chips/RatingChip";
import DurationChip from "../General/Chips/DurationChip";
import AddToWatchlistNoDataDialog from "./AddToWatchlistNoDataDialog";
import { useAuthContext } from "../../context/AuthProvider";
import { usePairId } from "../../api/hooks/pairs";

type AddToWatchlistDialogProps = {
   open: boolean;
   onClose: () => void;
   id: string;
};

const AddToWatchlistDialog = ({ open, id, onClose }: AddToWatchlistDialogProps) => {
   const { user } = useAuthContext();
   if (!user) return null;
   const { data: pairId } = usePairId(user.uid);
   const { breakpoints } = useTheme();
   const { data, isLoading } = useGetMovieDetails({ imdbId: id });
   const { mutate } = usePostToWatchlist();
   const parsedRating = parseFloat(data?.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : "0").toPrecision(
      1
   );
   const subtitle = ADD_MOVIE_SUBTITLE[parseInt(parsedRating)];

   const isMobile = useMediaQuery(breakpoints.down("sm"));

   const notify = () => toast(`Nice! "${data?.title}" is officially on your watchlist! 🎉`);

   const handleMutate = () => {
      if (data && pairId) {
         mutate(
            {
               newMovie: {
                  id: data.imdbID,
                  title: data.title,
                  productionYear: data.year,
                  cover: data.poster,
                  plot: data.plot,
                  director: data.director,
                  duration: data.runtime.replace(" min", ""),
                  imdbReview: Number(data.imdbRating),
                  genre: data.genre.split(", "),
               },
               pairId,
            },
            {
               onSuccess: () => {
                  notify();
                  onClose();
               },
            }
         );
      }
   };

   return (
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
         {isLoading ? (
            <AddToWatchlistDialogSkeleton />
         ) : (
            <>
               {data ? (
                  <>
                     <DialogTitle component="div">
                        <Typography variant="h4" color="primary.main" fontWeight={800}>
                           {data.title} ({data.year})
                        </Typography>
                     </DialogTitle>
                     <DialogContent>
                        <Stack spacing={2}>
                           <DialogContentText component="div">
                              <Typography color="textPrimary">{subtitle}</Typography>
                           </DialogContentText>
                           <Stack direction="row" spacing={2} alignItems="center">
                              <RatingChip rate={data.imdbRating} />
                              <DurationChip duration={data.runtime} />
                           </Stack>
                           <Typography>{data.plot}</Typography>
                           <Typography>{data.genre}</Typography>
                        </Stack>
                     </DialogContent>
                     <DialogActions sx={{ padding: 2 }}>
                        <Stack
                           spacing={2}
                           direction={isMobile ? "column" : "row"}
                           justifyContent="flex-end"
                           sx={{ width: "100%" }}
                        >
                           <Button startIcon={<AddCircleIcon />} onClick={() => handleMutate()} dark>
                              <FormattedMessage id="ADD_MOVIE.DIALOG.BUTTON.PRIMARY" />
                           </Button>
                           <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={() => onClose()}>
                              <FormattedMessage id="ADD_MOVIE.DIALOG.BUTTON.SECONDARY" />
                           </Button>
                        </Stack>
                     </DialogActions>
                  </>
               ) : (
                  <AddToWatchlistNoDataDialog onClose={() => onClose()} />
               )}
            </>
         )}
      </Dialog>
   );
};

export default AddToWatchlistDialog;
