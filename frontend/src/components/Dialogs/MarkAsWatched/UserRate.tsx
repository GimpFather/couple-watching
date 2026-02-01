import { Divider, Stack, Typography, useTheme } from "@mui/material";
import AvatarCircle from "~/components/Avatar/AvatarCircle";
import { remCalc } from "~/utils/utils";
import StarRating from "./StarRating";

type UserRateProps = {
	avatarSeed: string;
	username: string;
	rating: number;
	setRating: (rating: number) => void;
};

const UserRate = ({
	avatarSeed,
	username,
	rating,
	setRating,
}: UserRateProps) => {
	const { palette } = useTheme();

	return (
		<Stack direction="column" gap={1.5}>
			<Stack direction="column" gap={0.5}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Stack direction="row" gap={1} alignItems="center" sx={{ zIndex: 1 }}>
						<AvatarCircle
							seed={avatarSeed}
							size="20px"
							borderSize={remCalc("1.25px")}
						/>
						<Typography variant="emphasizedBodyMedium">{username}</Typography>
					</Stack>
					<Stack direction="row" gap={0.5} alignItems="center">
						<Typography variant="bodyMedium" sx={{ fontWeight: 700 }}>
							{rating === 0 ? "-" : rating}
						</Typography>
						<Typography variant="bodyMedium">/</Typography>
						<Typography variant="bodyMedium">10</Typography>
					</Stack>
				</Stack>
				<StarRating value={rating} handleRate={(value) => setRating(value)} />
			</Stack>
			<Divider sx={{ backgroundColor: palette.common.black, height: 1 }} />
		</Stack>
	);
};

export default UserRate;
