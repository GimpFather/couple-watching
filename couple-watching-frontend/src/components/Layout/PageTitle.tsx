import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

type PageTitleProps = {
   title: string;
   subtitle: string;
};

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
   return (
      <Stack spacing={0.5}>
         <Typography color="primary" variant="h3" component={motion.div} initial={{ y: -20 }} animate={{ y: 0 }}>
            {title}
         </Typography>
         <Typography variant="h6" component={motion.div} initial={{ y: 20 }} animate={{ y: 0 }}>
            {subtitle}
         </Typography>
      </Stack>
   );
};

export default PageTitle;
