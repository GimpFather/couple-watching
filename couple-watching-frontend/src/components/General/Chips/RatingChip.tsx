import { Stack, Typography, useTheme } from "@mui/material";
import { Star } from "@phosphor-icons/react";
import { FormattedMessage } from "react-intl";

type RatingChipProps = {
   rate: string | number;
};

const RatingChip = ({ rate }: RatingChipProps) => {
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
         <Star fontSize={20} weight="duotone" style={{ color: palette.common.black }} />
         <Typography variant="bodyMedium" sx={{ color: palette.common.black }}>
            <FormattedMessage
               id="CHIP.RATE.SLASH_TEN"
               values={{
                  rating: (
                     <Typography variant="bodyMedium" fontWeight={700} component="span">
                        {rate.toString().replace(".", ",")}
                     </Typography>
                  ),
               }}
            />
         </Typography>
      </Stack>
   );
};

export default RatingChip;
