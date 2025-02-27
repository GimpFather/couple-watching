import { Typography, useTheme, Stack } from "@mui/material";
import { Clock } from "@phosphor-icons/react";

type DurationChipProps = {
   duration: string;
};

const DurationChip = ({ duration }: DurationChipProps) => {
   const { palette } = useTheme();

   return (
      <Stack
         direction="row"
         alignItems="center"
         spacing={0.5}
         sx={{
            paddingX: 1.5,
            paddingY: 0.45,
            borderRadius: 4,
            border: `2px solid ${palette.common.black}`,
            backgroundColor: "accent.main",
         }}
      >
         <Clock fontSize={20} weight="duotone" style={{ color: palette.common.black }} />
         <Typography variant="bodyMedium" sx={{ color: palette.common.black }}>
            {duration}
         </Typography>
      </Stack>
   );
};

export default DurationChip;
