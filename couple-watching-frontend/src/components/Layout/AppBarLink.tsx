import { Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";

type AppBarLinkProps = {
   icon: React.ReactElement;
   filledIcon: React.ReactElement;
   url: string;
   caption: string;
};

const AppBarLink = ({ icon, filledIcon, url, caption }: AppBarLinkProps) => {
   const { pathname } = useLocation();
   const isActive = pathname === url;

   return (
      <Link to={url} style={{ color: "inherit", textDecoration: "inherit" }}>
         <Stack alignItems="center" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {isActive ? filledIcon : icon}
            <Typography color={isActive ? "primary.main" : "textPrimary"} variant="body1">
               <FormattedMessage id={caption} />
            </Typography>
         </Stack>
      </Link>
   );
};

export default AppBarLink;
