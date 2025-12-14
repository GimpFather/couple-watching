import { styled } from "@mui/material/styles";
import Card, { type CardProps } from "@mui/material/Card";
import { motion, type MotionProps } from "motion/react";

const MotionCard = motion.create(Card);

const CustomCard = styled(MotionCard)(({ theme }) => ({
   border: `1.5px solid ${theme.palette.common.black}`,
   borderRadius: 12,
   boxShadow: `4px 4px 0 0 ${theme.palette.common.black}`,
}));

type CustomCardProps = CardProps & MotionProps;

interface NBCardProps extends CustomCardProps {
   children: React.ReactNode;
}

const NBCard = ({ children, ...props }: NBCardProps) => {
   return <CustomCard {...props}>{children}</CustomCard>;
};

export default NBCard;
