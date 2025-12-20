import { memo, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NBCard from "~/components/NeoBrutalism/NBCard";
import type { ToastProps } from "~/components/Toasts/toasts.types";
import { useSound } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

const Toast = (props: ToastProps) => {
   const { title, description, color = "primary" } = props;
   const { playSound } = useSound();

   useEffect(() => {
      playSound(SOUNDS.NOTIFICATION_BUBBLE_POP.url);
   }, [playSound]);

   return (
      <NBCard sx={{ padding: "8px" }}>
         <Stack direction="column" gap="4px">
            <Typography variant="headingMedium" color={color}>
               {title}
            </Typography>
            <Typography variant="bodyMedium">{description}</Typography>
         </Stack>
      </NBCard>
   );
};

export default memo(Toast);
