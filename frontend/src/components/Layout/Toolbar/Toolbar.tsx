import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import ToolbarItem from "./ToolbarItem";
import { useLocation } from "react-router";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import {
   HouseLineIcon,
   FilmReelIcon,
   BinocularsIcon,
   ProjectorScreenChartIcon,
   SmileyXEyesIcon,
   type IconProps,
} from "@phosphor-icons/react";

const Toolbar = () => {
   const { pathname } = useLocation();
   const { palette } = useTheme();
   const handleNavigationTransition = useNavigationTransition();

   const getIcon = (label: string, active: boolean) => {
      const color = active ? palette.primary.main : palette.common.black;
      const weight = active ? "duotone" : "regular";
      const iconProps: IconProps = {
         weight,
         color,
         size: 24,
      };

      switch (label) {
         case "Home":
            return <HouseLineIcon {...iconProps} />;
         case "Library":
            return <FilmReelIcon {...iconProps} />;
         case "Search":
            return <BinocularsIcon {...iconProps} />;
         case "Statistics":
            return <ProjectorScreenChartIcon {...iconProps} />;
         case "Couple":
            return <SmileyXEyesIcon {...iconProps} />;
         default:
            return null;
      }
   };

   return (
      <Stack
         direction="row"
         justifyContent="space-around"
         alignItems="center"
         sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `1px solid ${palette.accent.main}`,
            padding: "6px 8px",
         }}
      >
         <ToolbarItem
            label="Home"
            icon={getIcon("Home", pathname === "/home")}
            onClick={() => handleNavigationTransition("/home")}
         />
         <ToolbarItem
            label="Library"
            icon={getIcon("Library", pathname === "/library")}
            onClick={() => handleNavigationTransition("/library")}
         />
         <ToolbarItem
            label="Search"
            icon={getIcon("Search", pathname === "/search")}
            onClick={() => handleNavigationTransition("/search")}
         />
         <ToolbarItem
            label="Statistics"
            icon={getIcon("Statistics", pathname === "/statistics")}
            onClick={() => handleNavigationTransition("/statistics")}
         />
         <ToolbarItem
            label="Couple"
            icon={getIcon("Couple", pathname === "/couple")}
            onClick={() => handleNavigationTransition("/couple")}
         />
      </Stack>
   );
};

export default Toolbar;
