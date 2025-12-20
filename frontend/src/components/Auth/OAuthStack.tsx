import Stack from "@mui/material/Stack";
import messages from "~/locales/en.json";
import { AppleLogoIcon, DiscordLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { SOUNDS } from "~/hooks/sounds.config";
import { useSound } from "~/hooks/useSound";
import { useAuth } from "~/context/auth/useAuth";

const OAuthStack = () => {
   const { signInWithOAuth } = useAuth();
   const { playSound } = useSound();
   const handleAppleLogin = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: messages["AUTH.OAUTH.APPLE.ALERT"],
         description: messages["AUTH.OAUTH.APPLE.DESCRIPTION"],
      });
   };

   const handleGoogleLogin = async () => {
      await signInWithOAuth("google");
   };

   const handleDiscordLogin = () => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
      showToast({
         title: messages["AUTH.OAUTH.DISCORD.ALERT"],
         description: messages["AUTH.OAUTH.DISCORD.DESCRIPTION"],
      });
   };

   return (
      <Stack gap="12px">
         <NBButton icon={<AppleLogoIcon />} color="accent" onClick={handleAppleLogin}>
            {messages["AUTH.OAUTH.APPLE.BUTTON"]}
         </NBButton>
         <NBButton icon={<GoogleLogoIcon />} color="accent" onClick={() => handleGoogleLogin()}>
            {messages["AUTH.OAUTH.GOOGLE.BUTTON"]}
         </NBButton>
         <NBButton icon={<DiscordLogoIcon />} color="accent" onClick={handleDiscordLogin}>
            {messages["AUTH.OAUTH.DISCORD.BUTTON"]}
         </NBButton>
      </Stack>
   );
};

export default OAuthStack;
