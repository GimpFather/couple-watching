import Stack from "@mui/material/Stack";
import messages from "~/locales/en.json";
import {
	AppleLogoIcon,
	DiscordLogoIcon,
	GoogleLogoIcon,
} from "@phosphor-icons/react";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useAuth } from "~/context/auth/useAuth";
import type { AuthOAuthProvider } from "~/context/context.types";
import showToast from "~/components/Toasts/showToast";

const OAuthStack = () => {
	const { signInWithOAuth } = useAuth();

	const handleOAuthLogin = async (provider: AuthOAuthProvider) => {
		await signInWithOAuth(provider);
	};

	const handleAppleLogin = () => {
		showToast({
			title: messages["AUTH.OAUTH.APPLE.ALERT"],
			description: messages["AUTH.OAUTH.APPLE.DESCRIPTION"],
		});
	};

	return (
		<Stack gap="12px">
			<NBButton
				icon={<AppleLogoIcon />}
				color="accent"
				onClick={handleAppleLogin}
			>
				{messages["AUTH.OAUTH.APPLE.BUTTON"]}
			</NBButton>
			<NBButton
				icon={<GoogleLogoIcon />}
				color="accent"
				onClick={() => handleOAuthLogin("google")}
			>
				{messages["AUTH.OAUTH.GOOGLE.BUTTON"]}
			</NBButton>
			<NBButton
				icon={<DiscordLogoIcon />}
				color="accent"
				onClick={() => handleOAuthLogin("discord")}
			>
				{messages["AUTH.OAUTH.DISCORD.BUTTON"]}
			</NBButton>
		</Stack>
	);
};

export default OAuthStack;
