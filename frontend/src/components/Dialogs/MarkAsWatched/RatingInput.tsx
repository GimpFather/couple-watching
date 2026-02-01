import { Stack, Typography, useTheme } from "@mui/material";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";
import UserRate from "./UserRate";
import { StarIcon } from "@phosphor-icons/react";
import { remCalc } from "~/utils/utils";

type RatingInputProps = {
	partnerRating: number;
	myRating: number;
	setPartnerRating: (rating: number) => void;
	setMyRating: (rating: number) => void;
};

const RatingInput = ({
	partnerRating,
	myRating,
	setPartnerRating,
	setMyRating,
}: RatingInputProps) => {
	const { palette } = useTheme();
	const { id: authId } = useRequiredAuth();
	const { data: pairData } = useGetMyPairWithProfiles(authId);

	const partnerUsername = pairData?.partnerUsername ?? "Your partner";
	const partnerAvatarSeed = pairData?.partnerAvatarSeed ?? "";

	const myUsername = pairData?.myUsername ?? "You";
	const myAvatarSeed = pairData?.myAvatarSeed ?? "";

	const finalScore = (myRating + partnerRating) / 2;

	return (
		<Stack
			gap={2}
			sx={{
				border: `1.5px solid ${palette.common.black}`,
				padding: "14.5px 12px",
				borderRadius: "16px",
				backgroundColor: palette.accent[50],
			}}
		>
			<UserRate
				avatarSeed={partnerAvatarSeed}
				username={partnerUsername}
				rating={partnerRating}
				setRating={setPartnerRating}
			/>
			<UserRate
				avatarSeed={myAvatarSeed}
				username={myUsername}
				rating={myRating}
				setRating={setMyRating}
			/>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="emphasizedBodyMedium">Final score</Typography>
				<Stack
					direction="row"
					gap={0.5}
					alignItems="center"
					sx={{
						border: `${remCalc("1.5px")} solid ${palette.common.black}`,
						borderRadius: "8px",
						backgroundColor: palette.primary.main,
						padding: "2px 12px",
					}}
				>
					<StarIcon size={18} weight="duotone" color={palette.common.black} />
					<Typography variant="bodyMedium" sx={{ fontWeight: 700 }}>
						{finalScore === 0 ? "-" : finalScore}
					</Typography>
					<Typography variant="bodyMedium">/</Typography>
					<Typography variant="bodyMedium">10</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RatingInput;
