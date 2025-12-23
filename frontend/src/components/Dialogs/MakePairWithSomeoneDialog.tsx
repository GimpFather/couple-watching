import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBModal from "~/components/NeoBrutalism/NBModal";
import NBButton from "~/components/NeoBrutalism/NBButton";
import type { DialogProps } from "~/components/Dialogs/dialogs.types";
import { CopyIcon, LinkIcon, PuzzlePieceIcon } from "@phosphor-icons/react";
import { useTheme } from "@mui/material/styles";
import showToast from "../Toasts/showToast";
import { useState } from "react";
import NBTextField from "../NeoBrutalism/NBTextField";

const MakePairWithSomeoneDialog = ({ open, onClose }: DialogProps) => {
   const theme = useTheme();

   const [link, setLink] = useState<string | null>(null);

   const handleGenerateLink = () => {
      const token = crypto.randomUUID();
      const fullLink = `${import.meta.env.VITE_FRONTEND_URL}/pair/${token}`;
      showToast({
         title: "Link is generated!",
         description: "Your link is ready to be shared with your partner.",
         color: "success",
      });
      setLink(fullLink);
   };

   const handleCopyLink = () => {
      if (link) {
         navigator.clipboard.writeText(link);
         showToast({
            title: "Link is in clipboard!",
            description: "That was easy!",
            color: "success",
         });
      }
   };

   const handleClose = () => {
      onClose();
   };

   return (
      <NBModal
         open={open}
         onClose={handleClose}
         children={
            <Stack component="form" onSubmit={() => {}} direction="column" gap="16px" textAlign="center">
               <Stack alignItems="center" gap="12px">
                  <PuzzlePieceIcon size={80} color={theme.palette.primary.dark} weight="duotone" />
                  <Typography variant="headingMedium">A missing piece of a puzzle</Typography>
                  <Typography variant="bodyMedium">
                     Click a button below to generate special invitation link. Share it with your partner, so they will
                     be able to join your pair.
                  </Typography>
                  <Typography variant="bodyMedium">
                     Links are viable for 1 hour only. Keep it secret and share it only with your partner.
                  </Typography>
                  <NBTextField
                     adornment={{
                        position: "end",
                        icon: (
                           <CopyIcon
                              size={20}
                              color={link ? theme.palette.primary.dark : theme.palette.accent[500]}
                              weight="duotone"
                           />
                        ),
                     }}
                     placeholder="There's gonna be a link after clicking the button below"
                     value={link}
                     readOnly
                     onClick={() => handleCopyLink()}
                     sx={{ cursor: "pointer", width: "100%" }}
                  />
               </Stack>
               <Stack direction="row" gap="12px">
                  <NBButton
                     icon={<LinkIcon size={20} />}
                     fullWidth
                     onClick={() => handleGenerateLink()}
                     disabled={!!link}
                  >
                     Generate
                  </NBButton>
                  <NBButton onClick={handleClose} color="danger">
                     Cancel
                  </NBButton>
               </Stack>
            </Stack>
         }
      />
   );
};

export default MakePairWithSomeoneDialog;
