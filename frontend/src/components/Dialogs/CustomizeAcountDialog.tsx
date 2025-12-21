import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBModal from "~/components/NeoBrutalism/NBModal";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import NBButton from "~/components/NeoBrutalism/NBButton";
import type { DialogProps } from "~/components/Dialogs/dialogs.types";
import showToast from "~/components/Toasts/showToast";

const CustomizeAcountDialog = ({ open, onClose }: DialogProps) => {
   const [username, setUsername] = useState("");

   const disableSubmit = !username;

   const handleUpdateData = async () => {
      showToast({
         title: "🎉🎉🎉",
         color: "success",
         description: `Hello, ${username}! 🎉`,
         sound: "MEME_ALERT_SHINE",
      });
      onClose();
   };

   const handleClose = () => {
      setUsername("");
      onClose();
   };

   return (
      <NBModal
         open={open}
         onClose={handleClose}
         children={
            <Stack direction="column" gap="16px">
               <Typography variant="headingLarge">Time for customization</Typography>
               <Stack direction="column" gap="12px">
                  <Typography variant="bodyMedium">
                     For testing purposes, you can customize your account details in this dialog.
                  </Typography>
                  <Stack>
                     <Typography variant="bodyMedium">Username</Typography>
                     <NBTextField
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                     />
                  </Stack>
               </Stack>
               <Stack direction="row" gap="12px">
                  <NBButton onClick={() => handleUpdateData()} disabled={disableSubmit} fullWidth>
                     Update data
                  </NBButton>
                  <NBButton onClick={handleClose} color="danger" fullWidth>
                     Cancel
                  </NBButton>
               </Stack>
            </Stack>
         }
      />
   );
};

export default CustomizeAcountDialog;
