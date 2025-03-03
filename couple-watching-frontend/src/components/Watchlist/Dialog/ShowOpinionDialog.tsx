import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { WatchedMovie } from "../../../types/Watchlist.types";

type ShowOpinionDialogProps = {
   open: boolean;
   onClose: () => void;
   data: WatchedMovie;
};

const ShowOpinionDialog = ({ open, onClose, data }: ShowOpinionDialogProps) => {
   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle>Show Opinion</DialogTitle>
         <DialogContent>
            <Typography>
               <FormattedMessage id="WATCHLIST.DIALOG.SHOW_OPINION.TITLE" />
            </Typography>
            {JSON.stringify(data)}
         </DialogContent>
      </Dialog>
   );
};

export default ShowOpinionDialog;
