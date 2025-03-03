import { Stack, Typography, useTheme } from "@mui/material";
import { Palette } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import IconButton from "../General/IconButton";

type PageTitleProps = {
   title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
   const { palette } = useTheme();
   return (
      <Stack spacing={0.5} direction="row" justifyContent="space-between" alignItems="center">
         <Typography variant="headingExtraLarge" component={motion.div} initial={{ y: -20 }} animate={{ y: 0 }}>
            <FormattedMessage id={title} />
         </Typography>
         <IconButton color="accent">
            <Palette style={{ color: palette.text.primary }} />
         </IconButton>
      </Stack>
   );
};

export default PageTitle;
