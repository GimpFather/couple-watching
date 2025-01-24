import { Stack, Typography, useTheme } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { motion } from "motion/react";

type PickerButtonProps = {
   handleOnClick: () => void;
   isSelected: boolean;
   caption: string;
};

const PickerButton = ({ handleOnClick, isSelected, caption }: PickerButtonProps) => {
   const { palette } = useTheme();
   return (
      <Stack
         component={motion.div}
         whileHover={{ scale: 1.05, borderColor: palette.primary.main }}
         whileTap={{ scale: 0.95 }}
         onClick={() => handleOnClick()}
         direction="row"
         justifyContent="space-between"
         alignItems="center"
         sx={{
            padding: 2,
            width: "100%",
            borderRadius: 4,
            backgroundColor: "background.paper",
            cursor: "pointer",
            border: `2px solid ${palette.common.white}`,
         }}
      >
         <Typography>{caption}</Typography>
         {isSelected && <RadioButtonCheckedIcon sx={{ color: "palette.common.white" }} />}
      </Stack>
   );
};

export default PickerButton;
