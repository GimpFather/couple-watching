import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetProfileData } from "~/api/hooks/profiles";
import NBButton from "~/components/NeoBrutalism/NBButton";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import ActionsBlock from "~/components/Layout/ActionsBlock";
import AvatarsDuo from "~/components/Avatar/AvatarsDuoPairing";
import LoadingPage from "~/components/Layout/LoadingPage";
import { useState } from "react";
import PersonalCodeBlock from "~/components/Profile/PersonalCodeBlock";

const PairingPage = () => {
   const user = useRequiredAuth();
   const { data: profileData, isLoading: isLoadingProfileData } = useGetProfileData(user.id);
   const handleNavigationTransition = useNavigationTransition();
   const [partnerCode, setPartnerCode] = useState("");

   if (!profileData?.avatarSeed || !profileData?.username || !profileData?.personalCode) {
      if (isLoadingProfileData) {
         return <LoadingPage />;
      }
      handleNavigationTransition("/customization/profile");
      return;
   }

   return (
      <>
         <PhoneContainer>
            <Stack direction="column" gap={2} alignItems="center" sx={{ marginTop: "64px" }}>
               <AvatarsDuo avatarSeedOne={profileData.avatarSeed} />
               <Stack direction="column" gap={1} alignItems="center" sx={{ marginBottom: "24px", textAlign: "center" }}>
                  <Stack>
                     <Typography variant="headingLarge">You look lonely</Typography>
                     <Typography variant="headingLarge">{`${profileData.username}... Pair up!`}</Typography>
                  </Stack>
                  <Stack>
                     <Typography variant="bodyMedium">Send your personal code to your partner</Typography>
                     <Typography variant="bodyMedium">or enter your partner’s personal code down below</Typography>
                  </Stack>
               </Stack>
               <PersonalCodeBlock personalCode={profileData.personalCode} />
               <Stack sx={{ width: "100%", marginBottom: "24px" }}>
                  <Typography variant="emphasizedBodyMedium">Partner's personal code</Typography>
                  <NBTextField
                     placeholder="Enter your partner's personal code"
                     value={partnerCode}
                     onChange={(event) => setPartnerCode(event.target.value)}
                     fullWidth
                  />
               </Stack>
            </Stack>
         </PhoneContainer>
         <ActionsBlock>
            <Stack gap="12px">
               <NBButton disabled fullWidth>
                  Continue
               </NBButton>
               <NBButton color="accent" onClick={() => handleNavigationTransition("/home")} fullWidth>
                  Skip for now
               </NBButton>
            </Stack>
         </ActionsBlock>
      </>
   );
};

export default PairingPage;
