/* eslint-disable react-hooks/rules-of-hooks */
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Controller, useForm } from "react-hook-form";
import { MarkMovieWatchedInputs } from "../../types/Inputs.types";
import dayjs from "dayjs";
import StarRating from "./StarRating";
import TagsSection from "./TagsSection";
import { FormattedMessage } from "react-intl";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDeleteMovieFromWatchlist, usePostMovieAsWatched } from "../../api/hooks/movies";
import { Movie } from "../../types/Watchlist.types";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../General/Button";
import { useAuthContext } from "../../context/AuthProvider";
import { usePairId } from "../../api/hooks/pairs";

interface AddProductDialogProps {
   open: boolean;
   onClose: () => void;
   data: Movie;
}

const MarkWatchedDialog = ({ open, onClose, data }: AddProductDialogProps) => {
   const { user } = useAuthContext();
   if (!user) return null;
   const { data: pairId } = usePairId(user.uid);
   const { palette } = useTheme();
   const queryClient = useQueryClient();
   const { mutate: markAsWatchedMutate } = usePostMovieAsWatched();
   const { mutate: deleteMutate } = useDeleteMovieFromWatchlist();
   const { control, watch } = useForm<MarkMovieWatchedInputs>({
      defaultValues: {
         rating: {
            ratingPersonOne: 4,
            ratingPersonTwo: 6,
            finalRating: 5,
         },
         watchedDate: new Date(),
         tags: {},
      },
   });
   const { rating, watchedDate, tags } = watch();

   const notifySuccess = () => toast("Nice! That film is officially watched. 🎉");
   const notifyError = () => toast("Oops! Something went wrong. 😢");

   if (!pairId) return null;

   const handleMarkAsWatched = () => {
      markAsWatchedMutate(
         {
            newMovie: {
               ...data,
               watchedDate: dayjs(watchedDate).format("DD/MM/YYYY"),
               rating: {
                  ratingPersonOne: rating.ratingPersonOne,
                  ratingPersonTwo: rating.ratingPersonTwo,
                  finalRating: (rating.ratingPersonOne + rating.ratingPersonTwo) / 2,
               },
               tags: {
                  isHorny: !!tags?.isHorny,
                  isSad: !!tags?.isSad,
                  isSnoby: !!tags?.isSnoby,
                  isLiterallyMe: !!tags?.isLiterallyMe,
                  isCertifiedShit: !!tags?.isCertifiedShit,
                  isGay: !!tags?.isGay,
               },
            },
            pairId,
         },
         {
            onSuccess: () => {
               deleteMutate(
                  { movieId: data.id, pairId },
                  {
                     onSuccess: () => {
                        notifySuccess();
                        queryClient.invalidateQueries({ queryKey: ["GET_WATCHLIST_MOVIES"] });
                        onClose();
                     },
                     onError: (e) => {
                        console.log(e.message);
                        notifyError();
                     },
                  }
               );
            },
            onError: (e) => {
               console.log(e.message);
               notifyError();
            },
         }
      );
   };

   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle component="div">
            <Typography variant="h4" color="primary.main" fontWeight={800}>
               {data.title}
            </Typography>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <DialogContentText component="div" sx={{ paddingBottom: 1 }}>
                  <Typography color="textPrimary">
                     <FormattedMessage id="WATCHLIST.DIALOG.MARK.SUBTITLE" />
                  </Typography>
               </DialogContentText>
               <Stack spacing={2}>
                  <Controller
                     name="watchedDate"
                     control={control}
                     render={({ field }) => (
                        <DatePicker
                           sx={{ width: "100%" }}
                           name={field.name}
                           value={dayjs(field.value)}
                           onChange={(date) => field.onChange(date)}
                           defaultValue={dayjs(new Date())}
                           format="DD/MM/YYYY"
                           label={<FormattedMessage id="WATCHLIST.DIALOG.MARK.INPUT.WATCHED_DATE.LABEL" />}
                           slots={{ openPickerIcon: EventAvailableIcon }}
                           slotProps={{
                              openPickerIcon: {
                                 sx: { color: palette.common.white },
                              },
                              inputAdornment: {
                                 position: "end",
                              },
                              textField: {
                                 variant: "outlined",
                                 color: "primary",
                              },
                              leftArrowIcon: {
                                 sx: { color: palette.common.white },
                              },
                              rightArrowIcon: {
                                 sx: { color: palette.common.white },
                              },
                              switchViewIcon: {
                                 sx: { color: palette.common.white },
                              },
                              layout: {
                                 sx: {
                                    "& .MuiDayCalendar-weekDayLabel": {
                                       color: palette.primary.main,
                                    },
                                 },
                              },
                           }}
                        />
                     )}
                  />
                  <Stack spacing={1}>
                     <Typography variant="body1">
                        <FormattedMessage id="WATCHLIST.DIALOG.MARK.INPUT.RATING.LABEL" />
                     </Typography>
                     <Typography variant="body2">Person One opinion</Typography>
                     <Controller
                        name="rating.ratingPersonOne"
                        control={control}
                        render={({ field }) => (
                           <StarRating value={field.value} handleRate={(value: number) => field.onChange(value)} />
                        )}
                     />
                     <Typography variant="body2">Person Two opinion</Typography>
                     <Controller
                        name="rating.ratingPersonTwo"
                        control={control}
                        render={({ field }) => (
                           <StarRating value={field.value} handleRate={(value: number) => field.onChange(value)} />
                        )}
                     />
                  </Stack>
                  <Stack spacing={1.25}>
                     <Typography variant="body1">
                        <FormattedMessage id="WATCHLIST.DIALOG.MARK.INPUT.TAGS.LABEL" />
                     </Typography>
                     <TagsSection watch={watch} control={control} />
                  </Stack>
               </Stack>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Button startIcon={<CheckCircleOutlineIcon />} onClick={() => handleMarkAsWatched()}>
               <FormattedMessage id="WATCHLIST.DIALOG.ACTION.PRIMARY" />
            </Button>
            <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={() => onClose()}>
               <FormattedMessage id="WATCHLIST.DIALOG.ACTION.SECONDARY" />
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default MarkWatchedDialog;
