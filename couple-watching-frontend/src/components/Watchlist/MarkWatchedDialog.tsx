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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MarkMovieWatchedInputs } from "../../types/Inputs.types";
import dayjs from "dayjs";
import StarRating from "./StarRating";
import TagsSection from "./TagsSection";
import { FormattedMessage } from "react-intl";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CustomIconButton from "../General/CustomIconButton";

interface AddProductDialogProps {
   open: boolean;
   onClose: () => void;
}

const MarkWatchedDialog = ({ open, onClose }: AddProductDialogProps) => {
   const { palette } = useTheme();
   const { control, handleSubmit, watch } = useForm<MarkMovieWatchedInputs>({
      defaultValues: { rating: 5, watchedDate: new Date(), tags: {} },
   });

   const notify = () => toast("Nice! That film is officially watched. 🎉");
   const onSubmit: SubmitHandler<MarkMovieWatchedInputs> = (data) => console.log(data);

   return (
      <Dialog open={open} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
               <Typography variant="h4">
                  <FormattedMessage id="WATCHLIST.DIALOG.MARK.TITLE" />
               </Typography>
            </DialogTitle>
            <DialogContent>
               <Stack spacing={2}>
                  <DialogContentText>
                     <Typography variant="body1" color="textPrimary">
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
                        <Controller
                           name="rating"
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
               <CustomIconButton
                  handleOnClick={() => {
                     notify();
                     onClose();
                  }}
                  icon={<CheckCircleOutlineIcon />}
                  text={
                     <Typography>
                        <FormattedMessage id="WATCHLIST.DIALOG.ACTION.PRIMARY" />
                     </Typography>
                  }
               />
               <CustomIconButton
                  dark
                  handleOnClick={() => {
                     onClose();
                  }}
                  icon={<ExitToAppIcon />}
                  text={
                     <Typography>
                        <FormattedMessage id="WATCHLIST.DIALOG.ACTION.SECONDARY" />
                     </Typography>
                  }
               />
            </DialogActions>
         </form>
      </Dialog>
   );
};

export default MarkWatchedDialog;
