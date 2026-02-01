import { Stack, useTheme } from "@mui/material";
import { StarIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

type StarRatingProps = {
	value: number;
	handleRate: (value: number) => void;
};

const StarRating = ({ value, handleRate }: StarRatingProps) => {
	const { palette } = useTheme();

	return (
		<Stack direction="row" gap={0.75}>
			{[...Array(10)].map((_, index) => {
				const starValue = index + 1;
				return (
					<motion.svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						initial={{ scale: 1 }}
						animate={{
							color:
								starValue <= value ? palette.primary.main : palette.accent[100],
							outline: "none",
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						style={{ cursor: "pointer" }}
						onClick={() => handleRate(starValue)}
						className={starValue <= value ? "overwrite-star-icon" : ""}
					>
						<StarIcon
							size={24}
							weight={starValue <= value ? "duotone" : "fill"}
						/>
					</motion.svg>
				);
			})}
		</Stack>
	);
};

export default StarRating;
