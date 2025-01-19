import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { Control, Controller, FieldValues, UseFormWatch } from "react-hook-form";
import CustomSwitch from "../General/CustomSwitch";
import { FormattedMessage } from "react-intl";

type CoolNerdModeProps = {
   control: Control<FieldValues, unknown>;
   watch: UseFormWatch<FieldValues>;
};

const CoolNerdMode = ({ control, watch }: CoolNerdModeProps) => {
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{ padding: 2, maxWidth: 375, backgroundColor: "background.paper", borderRadius: 4 }}
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Stack spacing={1}>
            <Typography variant="body1">
               <Typography component="span" display="inline" color="primary.main">
                  <FormattedMessage id="FILTERS.NERD_COOL_MODE.TITLE.NERD" />
               </Typography>
               <FormattedMessage id="FILTERS.NERD_COOL_MODE.TITLE.AND" />
               <Typography component="span" display="inline" color="secondary.main">
                  <FormattedMessage id="FILTERS.NERD_COOL_MODE.TITLE.COOL" />
               </Typography>
            </Typography>
            <Typography variant="body2">
               <FormattedMessage id="FILTERS.NERD_COOL_MODE.TITLE.SUBTITLE" />
            </Typography>
         </Stack>
         <Controller
            name="coolMode"
            control={control}
            render={({ field }) => (
               <CustomSwitch condition={watch("coolMode")} handleOnChange={() => field.onChange(!field.value)} />
            )}
         />
      </Stack>
   );
};

export default CoolNerdMode;
