import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";
import { random } from "lodash";

type ResponseDialogProps = {
   open: boolean;
   invName: string;
   handleClose: () => void;
   handleResponse: () => void;
};

const ResponseDialog = ({ handleClose, open, invName, handleResponse }: ResponseDialogProps) => {
   //TODO
   //This line of code is purely static. It generates a random avatar for the user.
   //In the future, it's gonna be replaced with the actual user's avatar.
   const avatarFrom = createAvatar(loreleiNeutral, {
      seed: random(0, 1000).toString(),
      eyebrows: ["variant01", "variant02", "variant12", "variant13"],
      eyes: ["variant01", "variant07", "variant09", "variant13", "variant15", "variant22", "variant24"],
      glasses: ["variant01", "variant02", "variant05"],
      mouth: ["happy02", "happy05", "happy09"],
   });

   const avatarTo = createAvatar(loreleiNeutral, {
      seed: random(0, 1000).toString(),
      flip: true,
      eyebrows: ["variant01", "variant02", "variant12", "variant13"],
      eyes: ["variant01", "variant07", "variant09", "variant13", "variant15", "variant22", "variant24"],
      glasses: ["variant01", "variant02", "variant05"],
      mouth: ["happy02", "happy05", "happy09"],
   });

   return (
      <Dialog open={open} onClose={() => handleClose()}>
         <DialogTitle component="div">
            <Typography variant="h4" color="secondary.main" fontWeight={800} sx={{ textAlign: "center" }}>
               <FormattedMessage id="RESPONSE_DIALOG.PAIR.TITLE" />
            </Typography>
         </DialogTitle>
         <DialogContent sx={{ paddingBottom: 0 }}>
            <Stack direction="row" justifyContent="center" gap={2}>
               <Avatar
                  alt="Avatar From"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarFrom.toString())}`}
                  sx={{ width: 64, height: 64 }}
               />
               <Avatar
                  alt="Avatar To"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(avatarTo.toString())}`}
                  sx={{ width: 64, height: 64 }}
               />
            </Stack>
            <Typography color="textPrimary" sx={{ paddingTop: 2, textAlign: "center" }}>
               <FormattedMessage
                  id="RESPONSE_DIALOG.PAIR.SUBTITLE"
                  values={{
                     inviter: invName,
                  }}
               />
            </Typography>
         </DialogContent>
         <DialogActions sx={{ padding: 2, justifyContent: "center" }}>
            <Button color="secondary" onClick={() => handleResponse()} variant="contained">
               <FormattedMessage id="RESPONSE_DIALOG.PAIR.BUTTON.PRIMARY" />
            </Button>
            <Button color="secondary" onClick={() => handleClose()}>
               <FormattedMessage id="RESPONSE_DIALOG.PAIR.BUTTON.SECONDARY" />
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ResponseDialog;
