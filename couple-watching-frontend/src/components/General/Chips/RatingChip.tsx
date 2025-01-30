import { Chip, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type RatingChipProps = {
   rate: string | number;
};

const RatingChip = ({ rate }: RatingChipProps) => {
   const { palette } = useTheme();
   return (
      <Chip
         icon={<StarRoundedIcon sx={{ fill: palette.background.paper }} />}
         label={
            <Typography variant="body2" sx={{ color: "background.paper" }}>
               <FormattedMessage
                  id="CHIP.RATE.SLASH_TEN"
                  values={{
                     rating: (
                        <Typography fontWeight={800} component="span">
                           {rate}
                        </Typography>
                     ),
                  }}
               />
            </Typography>
         }
         color="primary"
      />
   );
};

export default RatingChip;
