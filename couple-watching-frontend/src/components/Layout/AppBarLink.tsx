import { Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

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
         <Stack alignItems="center">
            {isActive ? filledIcon : icon}
            <Typography variant="body1" color="green">
               {caption}
            </Typography>
         </Stack>
      </Link>
   );
};

export default AppBarLink;
