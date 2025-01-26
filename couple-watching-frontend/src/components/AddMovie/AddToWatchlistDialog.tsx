import {
   Dialog,
   DialogActions,
   DialogContent,
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
import { motion } from "motion/react";
import StarIcon from "../General/CustomIcons/StarIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { toast } from "react-toastify";
import AddToWatchlistDialogSkeleton from "./AddToWatchlistDialogSkeleton";
import Button from "../General/Button";

type AddToWatchlistDialogProps = {
   open: boolean;
   onClose: () => void;
   id: string;
};

const AddToWatchlistDialog = ({ open, id, onClose }: AddToWatchlistDialogProps) => {
   const { breakpoints, palette } = useTheme();
   const { data, isLoading } = useGetMovieDetails({ imdbId: id });
   const { mutate } = usePostToWatchlist();

   const isMobile = useMediaQuery(breakpoints.down("sm"));

   const notify = () => toast(`Nice! "${data?.title}" is officially on your watchlist! 🎉`);

   const handleMutate = () => {
      if (data) {
         mutate(
            {
               id: data.imdbID,
               title: data.title,
               productionYear: data.year,
               cover: data.poster,
               plot: data.plot,
               director: data.director,
               imdbReview: Number(data.imdbRating),
               duration: Number(data.runtime),
               genre: data.genre.split(", "),
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
               <DialogTitle>
                  <Typography variant="h5" fontWeight={800} color="primary.main">
                     {data?.title} ({data?.year})
                  </Typography>
               </DialogTitle>
               <DialogContent>
                  <Stack spacing={2}>
                     <Stack direction="row" spacing={2} alignItems="center">
                        <Stack
                           direction="row"
                           alignItems="center"
                           sx={{
                              padding: 1,
                              backgroundColor: "primary.main",
                              borderRadius: 4,
                              width: "fit-content",
                           }}
                        >
                           <motion.svg
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                              style={{ fill: palette.background.paper }}
                           >
                              <StarIcon />
                           </motion.svg>
                           <Typography color="background.paper" variant="body2" sx={{ paddingLeft: 0.5 }}>
                              <Typography color="background.paper" variant="body2" fontWeight={600} component="span">
                                 {data?.imdbRating}
                              </Typography>
                              <FormattedMessage id="WATCHLIST.CARD.BACK_CARD.RATE.SLASH_TEN" />
                           </Typography>
                        </Stack>
                        <Stack
                           direction="row"
                           alignItems="center"
                           sx={{
                              padding: 1,
                              backgroundColor: "primary.main",
                              borderRadius: 4,
                              width: "fit-content",
                           }}
                        >
                           <AccessTimeIcon sx={{ color: palette.background.paper, width: 18, height: 18 }} />
                           <Typography color="background.paper" variant="body2" sx={{ paddingLeft: 0.5 }}>
                              <Typography color="background.paper" variant="body2" fontWeight={600} component="span">
                                 {data?.runtime}
                              </Typography>
                           </Typography>
                        </Stack>
                     </Stack>
                     <Typography>{data?.plot}</Typography>
                     <Typography>{data?.genre}</Typography>
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
         )}
      </Dialog>
   );
};

export default AddToWatchlistDialog;
