import { Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";

type TagChipProps = {
   caption: string;
   handleClick: () => void;
   value: boolean;
   emoji?: string;
};

const TagChip = ({ caption, emoji, value, handleClick }: TagChipProps) => {
   const { palette } = useTheme();
   return (
      <Stack
         spacing={0.5}
         direction="row"
         alignItems="center"
         component={motion.div}
         initial={{ scale: 1 }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.9 }}
         animate={{
            opacity: value ? 1 : 0.3,
            borderColor: value ? palette.primary.main : palette.background.default,
         }}
         onClick={() => handleClick()}
         sx={{
            paddingY: 1,
            paddingX: 2,
            background: palette.background.paper,
            width: "fit-content",
            borderRadius: 4,
            border: "3px solid",
         }}
      >
         {emoji && <Typography>{emoji}</Typography>}
         <Typography variant="body1">
            <FormattedMessage id={caption} />
         </Typography>
      </Stack>
   );
};

export default TagChip;
