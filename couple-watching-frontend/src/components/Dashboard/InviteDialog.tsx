import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import Button from "../General/Button";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthProvider";
import { FormattedMessage } from "react-intl";
import IosShareIcon from "@mui/icons-material/IosShare";
import { FacebookMessengerShareButton, FacebookMessengerIcon } from "react-share";

type InviteDialogProps = {
   open: boolean;
   handleClose: () => void;
};

const InviteDialog = ({ open, handleClose }: InviteDialogProps) => {
   const { user } = useAuthContext();
   const notify = () => toast(`Your ID has been copied! 🎉`);

   if (!user) return null;

   const INVITE_LINK = `${window.location.origin}/dashboard?invFromId=${user.uid}&invFrom=${user.displayName}`;

   const handleCopy = () => {
      navigator.clipboard.writeText(INVITE_LINK);
      notify();
      handleClose();
   };

   return (
      <Dialog open={open} onClose={() => handleClose()}>
         <DialogTitle component="div">
            <Typography variant="h4" color="primary.main" fontWeight={800}>
               <FormattedMessage id="INVITE_DIALOG.PAIR.TITLE" />
            </Typography>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <DialogContentText component="div" sx={{ paddingBottom: 1 }}>
                  <Typography color="textPrimary">
                     <FormattedMessage id="INVITE_DIALOG.PAIR.SUBTITLE" />
                  </Typography>
               </DialogContentText>
               <FacebookMessengerShareButton url={INVITE_LINK} appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
                  <Stack alignItems="center" spacing={1}>
                     <FacebookMessengerIcon round size={36} />
                     <Typography>
                        <FormattedMessage id="INVITE_DIALOG.PAIR.MESSENGER" />
                     </Typography>
                  </Stack>
               </FacebookMessengerShareButton>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Button startIcon={<IosShareIcon />} onClick={() => handleCopy()}>
               <FormattedMessage id="INVITE_DIALOG.PAIR.BUTTON.PRIMARY" />
            </Button>
            <Button onClick={() => handleClose()} variant="outlined">
               <FormattedMessage id="INVITE_DIALOG.PAIR.BUTTON.SECONDARY" />
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default InviteDialog;
