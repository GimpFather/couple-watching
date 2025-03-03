import { AppBar, Box, Stack, useTheme } from "@mui/material";
import { BookmarksSimple, HouseSimple, MagnifyingGlass, PresentationChart, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";
import { handleBackgroundGradient } from "../../utils";

const Navbar = () => {
   const { palette } = useTheme();
   const { pathname } = useLocation();

   const activeColor = palette.secondary.main;
   const inactiveColor = palette.common.black;

   return (
      <Box sx={{ paddingTop: "60px" }}>
         <AppBar
            position="fixed"
            sx={{
               top: "auto",
               bottom: 0,
               background: handleBackgroundGradient({ intensity: 10, backgroundColor: palette.background.default }),
               borderTop: `1px solid ${palette.accent.main}`,
               boxShadow: "none",
            }}
         >
            <Stack
               direction="row"
               justifyContent="space-around"
               alignItems="center"
               sx={{
                  paddingX: 1,
                  paddingY: 2,
               }}
            >
               <Link to="/dashboard" style={{ height: "28px" }}>
                  <HouseSimple size={28} color={pathname === "/dashboard" ? activeColor : inactiveColor} />
               </Link>
               <Link to="/watchlist" style={{ height: "28px" }}>
                  <BookmarksSimple
                     weight="duotone"
                     style={{ color: pathname === "/watchlist" ? activeColor : inactiveColor }}
                     size={28}
                     color={pathname === "/watchlist" ? activeColor : inactiveColor}
                  />
               </Link>
               <Link to="/add-movie" style={{ height: "28px" }}>
                  <MagnifyingGlass size={28} color={pathname === "/add-movie" ? activeColor : inactiveColor} />
               </Link>
               <PresentationChart size={28} color={pathname === "/stats" ? activeColor : inactiveColor} opacity={0.3} />
               <UserCircle size={28} color={pathname === "/account" ? activeColor : inactiveColor} opacity={0.3} />
            </Stack>
         </AppBar>
      </Box>
   );
};

export default Navbar;
