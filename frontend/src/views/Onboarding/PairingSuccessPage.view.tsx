import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import AvatarsDuoSuccess from "~/components/Avatar/AvatarsDuoSuccess";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBButton from "~/components/NeoBrutalism/NBButton";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import { playSound } from "~/hooks/useSound";
import { launchConfettiSuccess } from "~/utils/utils";

const PairingSuccessPage = () => {
	const handleNavigationTransition = useNavigationTransition();
	const { id: authId } = useRequiredAuth();
	const { data: pairData } = useGetMyPairWithProfiles(authId);

	useEffect(() => {
		launchConfettiSuccess();
		playSound("MEME_ALERT_SHINE_SOFT");
	}, []);

	return (
		<PhoneContainer>
			<Stack
				direction="column"
				gap={2}
				sx={{
					height: "100%",
					position: "absolute",
					top: "50%",
					left: 0,
					right: 0,
					transform: "translateY(-50%)",
					paddingBottom: "72px",
				}}
			>
				<Stack
					gap={1}
					alignItems="center"
					justifyContent="center"
					sx={{
						width: "100%",
						height: "100%",
						textAlign: "center",
					}}
				>
					<AvatarsDuoSuccess
						avatarSeedOne={pairData?.myAvatarSeed ?? ""}
						avatarSeedTwo={pairData?.partnerAvatarSeed ?? ""}
					/>
					<Typography variant="headingExtraLarge">{`You have successfully paired up with ${pairData?.partnerUsername}!`}</Typography>
					<Typography variant="bodyMedium">
						Everything is set up — it’s time to make history!
					</Typography>
				</Stack>
			</Stack>
			<Box
				sx={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					padding: "16px",
				}}
			>
				<NBButton onClick={() => handleNavigationTransition("/home")}>
					Let's go!
				</NBButton>
			</Box>
		</PhoneContainer>
	);
};

export default PairingSuccessPage;
