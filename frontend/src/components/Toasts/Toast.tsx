import type { ToastProps } from "./toasts.types";
import NBCard from "../NeoBrutalism/NBCard";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

const Toast = (props: ToastProps) => {
   const { title, description, color = "primary" } = props;

   return (
      <NBCard sx={{ padding: "8px" }}>
         <Stack direction="column" gap={2}>
            <Typography variant="headingMedium" color={color}>
               {title}
            </Typography>
            <Typography variant="bodyMedium">{description}</Typography>
         </Stack>
      </NBCard>
   );
};

export default Toast;
