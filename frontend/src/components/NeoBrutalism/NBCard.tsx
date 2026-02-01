import { memo } from "react";
import { styled } from "@mui/material/styles";
import Card, { type CardProps } from "@mui/material/Card";

const CustomCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== "disableShadow",
})<{ disableShadow: boolean }>(({ theme, disableShadow }) => ({
	border: `0.094rem solid ${theme.palette.common.black}`,
	borderRadius: "12px",
	boxShadow: disableShadow
		? `none`
		: `4px 4px 0 0 ${theme.palette.common.black}`,
}));

type CustomCardProps = CardProps;

interface NBCardProps extends CustomCardProps {
	children: React.ReactNode;
	disableShadow?: boolean;
}

const NBCard = ({ children, disableShadow = false, ...props }: NBCardProps) => {
	return (
		<CustomCard disableShadow={disableShadow} {...props}>
			{children}
		</CustomCard>
	);
};

export default memo(NBCard);
