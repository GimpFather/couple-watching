import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Stack,
   Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { toast } from "react-toastify";

interface AddProductDialogProps {
   open: boolean;
   onClose: () => void;
}

const MarkWatchedDialog = ({ open, onClose }: AddProductDialogProps) => {
   const notify = () => toast("Nice! That film is officially watched. 🎉");

   return (
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4 } }}>
         <DialogTitle>
            <Typography variant="h4">Great Watch! Now What? ✨</Typography>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <DialogContentText>
                  <Typography variant="body1" color="textPrimary">
                     Awesome! You've ticked that movie off your watchlist! 🌟 Let’s rate it and spill the tea—what did
                     you think? 🎬✨
                  </Typography>
               </DialogContentText>
               <Stack spacing={2}></Stack>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Button
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
                  Fuck go back
               </Typography>
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default MarkWatchedDialog;
