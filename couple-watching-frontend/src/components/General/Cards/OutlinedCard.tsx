import { styled } from "@mui/material/styles";
import Card, { CardProps } from "@mui/material/Card";
import { motion, MotionProps } from "framer-motion";

const MotionCard = motion(Card);

const CustomCard = styled(MotionCard)(({ theme, color }) => ({
   borderRadius: 3 * theme.shape.borderRadius,
   border: `4px solid ${color}`,
   boxShadow: `0px 0px 0px 2px ${theme.palette.common.black}, 4px 4px 0px 0px ${theme.palette.common.black}`,
}));

type CustomCardProps = CardProps & MotionProps;

interface OutlinedCardProps extends CustomCardProps {
   children: React.ReactNode;
   color: string;
}

const OutlinedCard = ({ children, color, ...props }: OutlinedCardProps): JSX.Element => {
   return (
      <CustomCard color={color} {...props}>
         {children}
      </CustomCard>
   );
};

export default OutlinedCard;
