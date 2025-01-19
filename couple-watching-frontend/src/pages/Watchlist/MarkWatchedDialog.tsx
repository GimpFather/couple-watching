import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Divider,
   Grid2 as Grid,
   Stack,
   Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MarkMovieWatchedInputs } from "../../types/Inputs.types";
import dayjs from "dayjs";
import StarRating from "../../components/Watchlist/StarRating";
import TagsSection from "../../components/Watchlist/TagsSection";

interface AddProductDialogProps {
   open: boolean;
   onClose: () => void;
}

const MarkWatchedDialog = ({ open, onClose }: AddProductDialogProps) => {
   const { control, handleSubmit, watch } = useForm<MarkMovieWatchedInputs>({
      defaultValues: { rating: 5, watchedDate: new Date(), tags: {} },
   });

   const notify = () =>
      toast(
         `Nice! That film is officially watched. 🎉 You watched it ${dayjs(watch("watchedDate")).format(
            "DD-MM-YYYY"
         )}, and you rate it by ${watch("rating")}!`
      );
   const onSubmit: SubmitHandler<MarkMovieWatchedInputs> = (data) => console.log(data);

   return (
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4 } }}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
               <Typography variant="h4">Great Watch! Now What? ✨</Typography>
            </DialogTitle>
            <DialogContent>
               <Stack spacing={2}>
                  <DialogContentText>
                     <Typography variant="body1" color="textPrimary">
                        Awesome! You've ticked that movie off your watchlist! 🌟 Let’s rate it and spill the tea—what
                        did you think? 🎬✨
                     </Typography>
                  </DialogContentText>
                  <Grid container spacing={2}>
                     <Grid size={12}>
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
                                 label="Watched date"
                                 slots={{ openPickerIcon: EventAvailableIcon }}
                                 slotProps={{
                                    openPickerIcon: {
                                       sx: { color: "#fff" },
                                    },
                                    inputAdornment: {
                                       position: "end",
                                    },
                                    textField: {
                                       variant: "outlined",
                                       color: "primary",
                                    },
                                 }}
                              />
                           )}
                        />
                     </Grid>
                     <Grid size={12}>
                        <Stack spacing={1}>
                           <Typography variant="body1">
                              How was it? Rate the vibes and let us know your thoughts! ⭐🎬
                           </Typography>
                           <Controller
                              name="rating"
                              control={control}
                              render={({ field }) => (
                                 <StarRating
                                    value={field.value}
                                    handleRate={(value: number) => field.onChange(value)}
                                 />
                              )}
                           />
                        </Stack>
                     </Grid>
                     <Divider
                        sx={{ width: "100%", border: "1px solid", borderRadius: 4, borderColor: "common.white" }}
                     />
                     <Grid size={12}>
                        <Stack spacing={1}>
                           <Typography variant="body1">
                              Let’s add some tags together! 🏷️ They’re optional, but with them, your dashboard gets even
                              cooler with fun stats! 📈🔥
                           </Typography>
                           <TagsSection watch={watch} control={control} />
                        </Stack>
                     </Grid>
                  </Grid>
               </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
               <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  sx={{ borderRadius: 2, paddingX: 2 }}
                  onClick={() => {
                     notify();
                     onClose();
                  }}
               >
                  <Typography variant="body2" sx={{ textTransform: "initial" }}>
                     Mark as watched
                  </Typography>
               </Button>
               <Button
                  variant="text"
                  startIcon={<CancelOutlinedIcon />}
                  sx={{ borderRadius: 2, paddingX: 2 }}
                  onClick={onClose}
               >
                  <Typography variant="body2" sx={{ textTransform: "initial" }}>
                     Close
                  </Typography>
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};

export default MarkWatchedDialog;
