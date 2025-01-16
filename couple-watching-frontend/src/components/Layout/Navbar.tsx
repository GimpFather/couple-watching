import { AppBar, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBarLink from "./AppBarLink";

const Navbar = () => {
   return (
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
         <Stack direction="row" justifyContent="space-around" sx={{ padding: 2, background: "#FFFF" }}>
            <AppBarLink
               icon={<DeleteOutlineRoundedIcon sx={{ color: "green" }} />}
               filledIcon={<DeleteIcon sx={{ color: "green", fill: 1 }} />}
               url={"/example"}
               caption={"Example Page"}
            />
            <AppBarLink
               icon={<AddCircleOutlineOutlinedIcon sx={{ color: "green" }} />}
               filledIcon={<AddCircleIcon sx={{ color: "green" }} />}
               url={"/add-movie"}
               caption={"Add the movie"}
            />
            <AppBarLink
               icon={<DashboardOutlinedIcon sx={{ color: "green" }} />}
               filledIcon={<DashboardIcon sx={{ color: "green" }} />}
               url={"/"}
               caption={"Dashboard"}
            />
         </Stack>
      </AppBar>
   );
};

export default Navbar;
