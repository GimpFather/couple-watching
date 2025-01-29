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
               Find your partner!
            </Typography>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <DialogContentText component="div" sx={{ paddingBottom: 1 }}>
                  <Typography color="textPrimary">
                     Simply copy the ID and give it to your partner, or paste below they ID!
                  </Typography>
               </DialogContentText>
               <TextField
                  label="Your ID"
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
                  render={({ field }) => <TextField {...field} label="Your partner ID" variant="outlined" />}
               />
               <DialogContentText component="div" sx={{ paddingBottom: 1 }}>
                  <Typography color="textPrimary">
                     Once you send the request to your partner, they will be able to accept or decline it. If they
                     accept it, you will be able to add movies to your couple watchlist!
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
               Invite!
            </Button>
            <Button
               onClick={() => {
                  handleClose();
                  reset();
               }}
               variant="outlined"
            >
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default InviteDialog;
