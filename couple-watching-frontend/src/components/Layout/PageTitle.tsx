import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";

type PageTitleProps = {
   title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
   return (
      <Stack spacing={0.5}>
         <Typography variant="headingExtraLarge" component={motion.div} initial={{ y: -20 }} animate={{ y: 0 }}>
            <FormattedMessage id={title} />
         </Typography>
      </Stack>
   );
};

export default PageTitle;
