import { AppBar, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AppBarLink from "./AppBarLink";

const Navbar = () => {
   return (
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
         <Stack direction="row" justifyContent="space-around" sx={{ padding: 2, backgroundColor: "background.paper" }}>
            <AppBarLink
               icon={<LocalMoviesOutlinedIcon sx={{ color: "common.white" }} />}
               filledIcon={<LocalMoviesIcon sx={{ color: "common.white" }} />}
               url={"/watchlist"}
               caption={"Watchlist"}
            />
            <AppBarLink
               icon={<AddCircleOutlineOutlinedIcon sx={{ color: "common.white" }} />}
               filledIcon={<AddCircleIcon sx={{ color: "common.white" }} />}
               url={"/add-movie"}
               caption={"Add the movie"}
            />
            <AppBarLink
               icon={<DashboardOutlinedIcon sx={{ color: "common.white" }} />}
               filledIcon={<DashboardIcon sx={{ color: "common.white" }} />}
               url={"/example"}
               caption={"Dashboard"}
            />
         </Stack>
      </AppBar>
   );
};

export default Navbar;
