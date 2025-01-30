import { DialogTitle, Typography, DialogContent, Stack, DialogContentText, DialogActions } from "@mui/material";
import Button from "../General/Button";
import { FormattedMessage } from "react-intl";

type AddToWatchlistNoDataDialogProps = {
   onClose: () => void;
};

const AddToWatchlistNoDataDialog = ({ onClose }: AddToWatchlistNoDataDialogProps) => {
   return (
      <>
         <DialogTitle component="div">
            <Typography variant="h4" color="primary.main" fontWeight={800}>
               <FormattedMessage id="ADD_MOVIE.DIALOG.NO_DATA.TITLE" />
            </Typography>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <DialogContentText component="div">
                  <Typography color="textPrimary">
                     <FormattedMessage id="ADD_MOVIE.DIALOG.NO_DATA.DESC" />
                  </Typography>
               </DialogContentText>
               <DialogContentText component="div">
                  <Typography color="textPrimary">
                     <FormattedMessage id="ADD_MOVIE.DIALOG.NO_DATA.BUTTON.DESC.PART_TWO" />
                  </Typography>
               </DialogContentText>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2}>
               <Button onClick={() => onClose()} dark>
                  <FormattedMessage id="ADD_MOVIE.DIALOG.NO_DATA.BUTTON.PRIMARY" />
               </Button>
               <Button onClick={() => onClose()} dark>
                  <FormattedMessage id="ADD_MOVIE.DIALOG.NO_DATA.BUTTON.SECONDARY" />
               </Button>
            </Stack>
         </DialogActions>
      </>
   );
};

export default AddToWatchlistNoDataDialog;
