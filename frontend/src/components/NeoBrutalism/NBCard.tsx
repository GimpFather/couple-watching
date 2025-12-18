import { memo } from "react";
import { styled } from "@mui/material/styles";
import Card, { type CardProps } from "@mui/material/Card";

const CustomCard = styled(Card)(({ theme }) => ({
   border: `0.094rem solid ${theme.palette.common.black}`,
   borderRadius: "12px",
   boxShadow: `4px 4px 0 0 ${theme.palette.common.black}`,
}));

type CustomCardProps = CardProps;

interface NBCardProps extends CustomCardProps {
   children: React.ReactNode;
}

const NBCard = ({ children, ...props }: NBCardProps) => {
   return <CustomCard {...props}>{children}</CustomCard>;
};

export default memo(NBCard);
