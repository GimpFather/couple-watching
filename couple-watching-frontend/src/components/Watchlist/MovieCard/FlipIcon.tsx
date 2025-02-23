import { motion } from "motion/react";
import DeviceRotate from "../../General/CustomIcons/DeviceRotate";
import { SvgIcon } from "@mui/material";

type FlipIconProps = {
   handleClick: () => void;
};

const FlipIcon = ({ handleClick }: FlipIconProps) => {
   return (
      <SvgIcon
         component={motion.svg}
         onClick={() => handleClick()}
         sx={{
            backgroundColor: "grey.100",
            color: "common.black",
            padding: 1,
            fontSize: 40,
            borderRadius: 3,
            outline: "none",
         }}
      >
         <DeviceRotate />
      </SvgIcon>
   );
};

export default FlipIcon;
