import { memo } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NBCard from "~/components/NeoBrutalism/NBCard";
import type { ToastProps } from "~/components/Toasts/toasts.types";

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

export default memo(Toast);
