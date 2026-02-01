import { memo } from "react";
import { motion } from "motion/react";

type PhoneContainerProps = {
	children: React.ReactNode;
	developerMode?: boolean;
};

const PhoneContainer = ({
	children,
	developerMode = false,
}: PhoneContainerProps) => {
	return (
		<motion.div
			initial={{ y: "-100%" }}
			animate={{ y: 0 }}
			exit={{ y: "-100%" }}
			transition={{
				duration: 0.3,
				ease: [0.87, 0, 0.13, 1],
			}}
			style={{
				padding: "16px",
				maxWidth: 375,
				margin: "0 auto",
				...(developerMode && {
					border: "1px dashed #453E3E",
				}),
			}}
		>
			{children}
		</motion.div>
	);
};

export default memo(PhoneContainer);
