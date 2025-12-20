import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

interface ToolbarItemProps {
   label: string;
   onClick: () => void;
   icon: ReactNode;
}

const ToolbarItem = ({ label, onClick, icon }: ToolbarItemProps) => {
   return (
      <Stack gap="2px" alignItems="center" justifyContent="center" sx={{ cursor: "pointer" }} onClick={onClick}>
         {icon}
         <Typography
            sx={{
               fontFamily: `'DM Sans Variable', sans-serif`,
               fontSize: "10px",
               fontWeight: 500,
               lineHeight: "175%",
               color: "text.primary",
            }}
         >
            {label}
         </Typography>
      </Stack>
   );
};

export default ToolbarItem;
