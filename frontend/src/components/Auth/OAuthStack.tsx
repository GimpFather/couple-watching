import { Stack } from "@mui/material";
import { MESSAGES } from "~/locales/en";
import { AppleLogoIcon, DiscordLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import NBButton from "../NeoBrutalism/NBButton";
import showToast from "../Toasts/showToast";
import { SOUNDS } from "~/hooks/sounds.config";
import { useSound } from "~/hooks/useSound";

const OAuthStack = () => {
   const { APPLE, GOOGLE, DISCORD } = MESSAGES.AUTH.OAUTH;
   const { playSound } = useSound();
   const handleAppleLogin = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: APPLE.ALERT,
         description: APPLE.DESCRIPTION,
      });
   };

   const handleGoogleLogin = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: GOOGLE.ALERT,
         description: GOOGLE.DESCRIPTION,
      });
   };

   const handleDiscordLogin = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: DISCORD.ALERT,
         description: DISCORD.DESCRIPTION,
      });
   };

   return (
      <Stack gap="12px">
         <NBButton startIcon={<AppleLogoIcon size={24} />} color="common" onClick={handleAppleLogin}>
            {APPLE.BUTTON}
         </NBButton>
         <NBButton startIcon={<GoogleLogoIcon size={24} />} color="accent" onClick={handleGoogleLogin}>
            {GOOGLE.BUTTON}
         </NBButton>
         <NBButton startIcon={<DiscordLogoIcon size={24} />} color="accent" onClick={handleDiscordLogin}>
            {DISCORD.BUTTON}
         </NBButton>
      </Stack>
   );
};

export default OAuthStack;
