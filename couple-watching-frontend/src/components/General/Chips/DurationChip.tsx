import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Typography, Chip, useTheme } from "@mui/material";

type DurationChipProps = {
   duration: string;
};

const DurationChip = ({ duration }: DurationChipProps) => {
   const { palette } = useTheme();

   return (
      <Chip
         icon={<AccessTimeIcon sx={{ fill: palette.background.paper }} />}
         label={
            <Typography fontWeight={800} sx={{ color: "background.paper" }}>
               {duration}
            </Typography>
         }
         color="primary"
      />
   );
};

export default DurationChip;
