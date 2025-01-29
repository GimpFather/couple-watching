import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import Button from "../General/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { Controller, useForm } from "react-hook-form";
import { PairRequestInput } from "../../types/Inputs.types";
import { useSendPairRequest } from "../../api/hooks/pairs";
import { useAuthContext } from "../../context/AuthProvider";
import { FormattedMessage } from "react-intl";

type InviteDialogProps = {
   open: boolean;
   handleClose: () => void;
};

const InviteDialog = ({ open, handleClose }: InviteDialogProps) => {
   const { user } = useAuthContext();
   const { mutate: sendPairRequest, isPending } = useSendPairRequest();
   const notify = () => toast(`Your ID has been copied! 🎉`);

   const { watch, control, reset } = useForm<PairRequestInput>();
   const { to } = watch();

   if (!user) return null;

   const handleCopy = () => {
      navigator.clipboard.writeText(user.uid);
      notify();
   };

   const handleSendPairRequest = () => {
      sendPairRequest(
         { from: user.uid, to, inviterName: user.displayName ?? "" },
         {
            onSuccess: () => {
               toast("Your request has been sent! 🎉");
            },
            onError: () => {
               toast("Oops! Something went wrong. 😢");
            },
         }
      );
   };

   const buttonsDisabled = !to || to === user.uid || isPending;

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
               <TextField
                  label={<FormattedMessage id="INVITE_DIALOG.PAIR.YOUR_ID_LABEL" />}
                  variant="outlined"
                  defaultValue={user.uid}
                  slotProps={{
                     input: {
                        readOnly: true,
                        endAdornment: (
                           <ContentCopyIcon
                              component={motion.svg}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopy()}
                              sx={{ cursor: "pointer", outline: "none" }}
                           />
                        ),
                     },
                  }}
               />
               <Controller
                  control={control}
                  name="to"
                  render={({ field }) => (
                     <TextField
                        {...field}
                        label={<FormattedMessage id="INVITE_DIALOG.PAIR.YOUR_PARTNER_ID_LABEL" />}
                        variant="outlined"
                     />
                  )}
               />
               <DialogContentText component="div" sx={{ paddingBottom: 1 }}>
                  <Typography color="textPrimary">
                     <FormattedMessage id="INVITE_DIALOG.PAIR.DESC" />
                  </Typography>
               </DialogContentText>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Button
               disabled={buttonsDisabled}
               onClick={() => handleSendPairRequest()}
               startIcon={<SendIcon sx={{ rotate: "180deg" }} />}
            >
               <FormattedMessage id="INVITE_DIALOG.PAIR.BUTTON.PRIMARY" />
            </Button>
            <Button
               onClick={() => {
                  handleClose();
                  reset();
               }}
               variant="outlined"
            >
               <FormattedMessage id="INVITE_DIALOG.PAIR.BUTTON.SECONDARY" />
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default InviteDialog;
