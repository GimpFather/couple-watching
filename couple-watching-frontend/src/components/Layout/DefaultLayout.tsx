import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useMediaQuery, useTheme } from "@mui/material";

const DefaultLayout = () => {
   const { breakpoints } = useTheme();
   const isMobile = useMediaQuery(breakpoints.down("sm"));
   console.log(isMobile);
   return (
      <>
         <Outlet />
         <Navbar />
      </>
   );
};

export default DefaultLayout;
