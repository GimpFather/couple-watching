import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { Control, Controller, FieldValues, UseFormWatch } from "react-hook-form";
import CustomSwitch from "../General/CustomSwitch";

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
                  The Nerd Mode
               </Typography>{" "}
               and{" "}
               <Typography component="span" display="inline" color="secondary.main">
                  The Cool Mode
               </Typography>
            </Typography>
            <Typography variant="body2">Choose the way, you gonna see the list.</Typography>
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
