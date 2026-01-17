import { useDeletePair } from "~/api/hooks/pairs";
import NBModal from "~/components/NeoBrutalism/NBModal";
import type { DialogProps } from "~/components/Dialogs/dialogs.types";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { ImageBrokenIcon } from "@phosphor-icons/react";
import { useTheme } from "@mui/material/styles";
import showToast from "~/components/Toasts/showToast";

const DeletePairDialog = ({ open, onClose, pairId }: DialogProps & { pairId: string }) => {
   const { mutate: mutateDeletePair, isPending: isDeletingPair } = useDeletePair();

   const theme = useTheme();

   const handleClose = () => {
      onClose();
   };

   const handleDeletePair = () => {
      mutateDeletePair(pairId, {
         onSuccess: () => {
            showToast({
               title: "Pair deleted!",
               color: "danger",
               description: "Your pair has been deleted successfully.",
               sound: "MEME_ALERT_VIOLIN_SAD",
            });
            onClose();
         },
         onError: (error) => {
            showToast({
               title: "Something went wrong!",
               color: "danger",
               description: error.message,
            });
         },
      });
   };

   return (
      <NBModal
         open={open}
         onClose={handleClose}
         children={
            <Stack direction="column" gap="16px">
               <Stack alignItems="center" gap="6px">
                  <ImageBrokenIcon size={80} color={theme.palette.danger.light} weight="duotone" />
                  <Typography variant="headingLarge" textAlign="center">
                     Sometimes we need to move forward...{" "}
                  </Typography>
               </Stack>
               <Stack direction="column" gap="12px">
                  <Typography variant="bodyMedium">
                     You are about to delete your pair. This action is irreversible. All your reviews and pair data will
                     be lost forever.{" "}
                     <Typography
                        component="span"
                        sx={{ fontWeight: 500 }}
                        variant="emphasizedBodyMedium"
                        color={theme.palette.danger.light}
                     >
                        Are you sure you want to proceed?
                     </Typography>
                  </Typography>
               </Stack>
               <Stack direction="row" gap="12px">
                  <NBButton onClick={() => handleDeletePair()} fullWidth>
                     Delete pair
                  </NBButton>
                  <NBButton onClick={handleClose} color="danger" fullWidth disabled={isDeletingPair}>
                     Go back
                  </NBButton>
               </Stack>
            </Stack>
         }
      />
   );
};

export default DeletePairDialog;
