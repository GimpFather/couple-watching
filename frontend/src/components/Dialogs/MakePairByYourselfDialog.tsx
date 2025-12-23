import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBModal from "~/components/NeoBrutalism/NBModal";
import NBButton from "~/components/NeoBrutalism/NBButton";
import type { DialogProps } from "~/components/Dialogs/dialogs.types";
import { HeartHalfIcon, SealQuestionIcon } from "@phosphor-icons/react";
import { useTheme } from "@mui/material/styles";
import NBTextField from "../NeoBrutalism/NBTextField";
import { useState } from "react";
import { useGetProfileData } from "~/api/hooks/profiles";
import showToast from "../Toasts/showToast";
import { useMakePairByYourself } from "~/api/hooks/pairs";

const PARTNER_NICKNAME_OPTIONS = [
   "Cuttie Pie",
   "Sweetie Pie",
   "My Sweetie",
   "Honey Bun",
   "Sugar Babe",
   "Sweetheart",
   "Bae~",
   "Babyy",
   "My Beautifull Dark Twisted Fantasy",
   "Darling",
   "Shadowcakes",
   "best_boyfriend_1",
   "best_girlfriend_1",
   "love_of_my_life",
   "the one",
   "crocodileeRAWRR",
];

const MakePairByYourselfDialog = ({ open, onClose, authId }: DialogProps & { authId: string }) => {
   const theme = useTheme();
   const [partnerNickname, setPartnerNickname] = useState("");
   const { data: profileData } = useGetProfileData(authId);
   const { mutate: mutateMakePairByYourself } = useMakePairByYourself();

   const handleGeneratePartnerNickname = () => {
      const randomIndex = Math.floor(Math.random() * PARTNER_NICKNAME_OPTIONS.length);
      setPartnerNickname(PARTNER_NICKNAME_OPTIONS[randomIndex]);
   };

   const handleClose = () => {
      setPartnerNickname("");
      onClose();
   };

   const handleCreatePair = async () => {
      if (!profileData?.username) return;
      if (!partnerNickname) return;
      mutateMakePairByYourself(
         {
            firstProfileId: profileData.id,
            secondDisplayName: partnerNickname,
         },
         {
            onSuccess: () => {
               showToast({
                  title: "🎉 Pair created!",
                  color: "success",
                  description: "Your pair has been created successfully.",
               });
               handleClose();
            },
            onError: (error) => {
               showToast({
                  title: "🤔 Something went wrong.",
                  color: "danger",
                  description: error.message,
               });
            },
         }
      );
   };

   return (
      <NBModal
         open={open}
         onClose={handleClose}
         children={
            <Stack component="form" onSubmit={() => {}} direction="column" gap="16px" textAlign="justify">
               <Stack alignItems="center" gap="12px">
                  <HeartHalfIcon size={80} color={theme.palette.primary.dark} weight="duotone" />
                  <Typography variant="headingMedium">Pair on your own</Typography>
                  <Typography variant="bodyMedium">
                     If your partner doesn't want to download the app or maybe they are just too lazy to do it, you can
                     create a pair managed by yourself. You will be able to add ratings, comments, and other things for
                     both of you. Your partner will be able to join your pair if they will change their mind.
                  </Typography>
               </Stack>
               <Stack>
                  <Typography variant="bodyMedium">Partner's nickname</Typography>
                  <NBTextField
                     placeholder="Your partner's nickname"
                     value={partnerNickname}
                     onChange={(event) => setPartnerNickname(event.target.value)}
                     adornment={{
                        position: "end",
                        icon: <SealQuestionIcon size={20} color={theme.palette.primary.dark} weight="duotone" />,
                        onClick: () => handleGeneratePartnerNickname(),
                     }}
                  />
               </Stack>
               <Stack direction="row" gap="12px">
                  <NBButton fullWidth onClick={() => handleCreatePair()}>
                     Create pair
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

export default MakePairByYourselfDialog;
