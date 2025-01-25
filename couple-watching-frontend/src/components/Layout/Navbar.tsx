import { AppBar, Box, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AppBarLink from "./AppBarLink";

const Navbar = () => {
   return (
      //TODO: Fix the padding in the box
      //The padding in the box is added due to problem with the fixed AppBar
      <Box sx={{ paddingTop: "80px" }}>
         <AppBar elevation={24} position="fixed" sx={{ top: "auto", bottom: 0, backgroundColor: "unset" }}>
            <Stack
               direction="row"
               justifyContent="space-around"
               sx={{ padding: 2, backgroundColor: "background.paper" }}
            >
               <AppBarLink
                  icon={<LocalMoviesOutlinedIcon sx={{ color: "common.white" }} />}
                  filledIcon={<LocalMoviesIcon sx={{ color: "primary.main" }} />}
                  url={"/watchlist"}
                  caption={"NAVBAR.WATCHLIST"}
               />
               <AppBarLink
                  icon={<AddCircleOutlineOutlinedIcon sx={{ color: "common.white" }} />}
                  filledIcon={<AddCircleIcon sx={{ color: "primary.main" }} />}
                  url={"/add-movie"}
                  caption={"NAVBAR.ADD_THE_MOVIE"}
               />
               <AppBarLink
                  icon={<DashboardOutlinedIcon sx={{ color: "common.white" }} />}
                  filledIcon={<DashboardIcon sx={{ color: "primary.main" }} />}
                  url={"/"}
                  caption={"NAVBAR.DASHBOARD"}
               />
            </Stack>
         </AppBar>
      </Box>
   );
};

export default Navbar;
