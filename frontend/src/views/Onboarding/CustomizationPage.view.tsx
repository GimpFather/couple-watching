import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DiceSixIcon } from "@phosphor-icons/react";
import { useGetProfileData, useUpdateProfileData } from "~/api/hooks/profiles";
import NBButton from "~/components/NeoBrutalism/NBButton";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import showToast from "~/components/Toasts/showToast";
import { generateAvatarSeed } from "~/utils/utils";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import AvatarCircle from "~/components/Avatar/AvatarCircle";
import ActionsBlock from "~/components/Layout/ActionsBlock";

const CustomizationPage = () => {
   const user = useRequiredAuth();
   const [avatarSeed, setAvatarSeed] = useState<string>("");
   const handleNavigationTransition = useNavigationTransition();
   const [username, setUsername] = useState("");

   const { data: profileData } = useGetProfileData(user.id);
   const { mutate: updateProfileData, isPending: isUpdatingProfileData } = useUpdateProfileData(user.id);

   const haveUsername = Boolean(profileData?.username);

   const disableSubmit = (!username || isUpdatingProfileData || !avatarSeed) && !haveUsername;

   const handleSetProfileData = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (haveUsername && !username) {
         handleNavigationTransition("/customization/pairing");
         return;
      }
      updateProfileData(
         { username, avatarSeed },
         {
            onSuccess: () => {
               handleNavigationTransition("/customization/pairing");
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

   const handleGenerateAvatar = () => {
      const newSeed = generateAvatarSeed();
      setAvatarSeed(newSeed);
   };

   useEffect(() => {
      handleGenerateAvatar();
   }, []);

   return (
      <form onSubmit={handleSetProfileData}>
         <PhoneContainer>
            <Stack direction="column" gap={2} alignItems="center" sx={{ marginTop: "64px" }}>
               <AvatarCircle seed={profileData?.avatarSeed ?? avatarSeed} />
               <Stack direction="column" gap={1} alignItems="center" sx={{ marginBottom: "24px", textAlign: "center" }}>
                  <Typography variant="headingLarge">So... who are you actually?</Typography>
                  <Typography variant="bodyMedium">
                     {!haveUsername
                        ? "It ain’t much, but it’s valuable information"
                        : `${profileData?.username} sounds good, but it's up to you!`}
                  </Typography>
               </Stack>
               <Stack sx={{ width: "100%", marginBottom: "24px" }}>
                  <Typography variant="emphasizedBodyMedium">Your name</Typography>
                  <NBTextField
                     placeholder={!haveUsername ? "Enter your username" : `${profileData?.username}`}
                     value={username}
                     onChange={(event) => setUsername(event.target.value)}
                     fullWidth
                  />
               </Stack>
               <NBButton
                  color="accent"
                  disabled={!!profileData?.avatarSeed || isUpdatingProfileData}
                  icon={<DiceSixIcon size={18} />}
                  onClick={handleGenerateAvatar}
                  fullWidth
               >
                  Shufle your avatar
               </NBButton>
            </Stack>
         </PhoneContainer>
         <ActionsBlock>
            <NBButton type="submit" fullWidth disabled={disableSubmit}>
               Continue
            </NBButton>
         </ActionsBlock>
      </form>
   );
};

export default CustomizationPage;
