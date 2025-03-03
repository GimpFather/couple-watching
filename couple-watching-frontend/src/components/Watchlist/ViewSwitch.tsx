import { Typography, Button, useTheme, Stack } from "@mui/material";
import { motion, useMotionValue, useSpring } from "motion/react";
import { FormattedMessage } from "react-intl";

type ViewMode = "watchlist" | "watched";

interface ViewSwitchButtonProps {
   direction: "left" | "right";
   isActive: boolean;
   onChange: () => void;
}

const SwitchButton = ({ direction, isActive, onChange }: ViewSwitchButtonProps) => {
   const y = useMotionValue(-5);
   const ySpring = useSpring(y, { stiffness: 400, damping: 20 });
   const { palette } = useTheme();

   const getBorderRadius = (side: "left" | "right") => {
      return direction === side ? 12 : 0;
   };

   const getColors = () => ({
      main: isActive ? palette.secondary.main : palette.accent.main,
      dark: isActive ? palette.secondary.dark : palette.accent.dark,
      light: isActive ? palette.secondary.light : palette.accent.light,
      text: isActive ? palette.text.secondary : palette.text.primary,
   });

   const colors = getColors();

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
         style={{
            position: "relative",
            width: "50%",
         }}
         onClick={onChange}
      >
         <motion.div
            style={{
               position: "absolute",
               height: 36,
               width: "100%",
               backgroundColor: colors.dark,
               borderTopRightRadius: getBorderRadius("right"),
               borderBottomRightRadius: getBorderRadius("right"),
               borderTopLeftRadius: getBorderRadius("left"),
               borderBottomLeftRadius: getBorderRadius("left"),
               border: "2px solid black",
               y: 4,
            }}
         />
         <motion.div
            style={{ y: ySpring }}
            onTapStart={() => y.set(0)}
            onTapCancel={() => y.set(-5)}
            onPointerUp={() => y.set(-5)}
         >
            <Button
               variant="contained"
               disableRipple
               sx={{
                  height: 40,
                  width: "100%",
                  padding: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  backgroundColor: colors.main,
                  color: colors.text,
                  border: "2px solid black",
                  borderTopRightRadius: getBorderRadius("right"),
                  borderBottomRightRadius: getBorderRadius("right"),
                  borderTopLeftRadius: getBorderRadius("left"),
                  borderBottomLeftRadius: getBorderRadius("left"),
                  transition: "background-color 0.3s cubic-bezier(0.1, 0, 0.2, 1)",
                  "&:hover": {
                     backgroundColor: colors.light,
                  },
                  "&:disabled": {
                     backgroundColor: "grey.400",
                     cursor: "not-allowed",
                  },
               }}
            >
               <Typography variant="emphasizedBodyMedium">
                  <FormattedMessage id={`WATCHLIST.VIEW_SWITCH.${direction === "left" ? "WATCHLIST" : "WATCHED"}`} />
               </Typography>
            </Button>
         </motion.div>
      </motion.div>
   );
};

interface ViewSwitchProps {
   activeButton: ViewMode;
   onChange: (activeButton: ViewMode) => void;
}

const ViewSwitch = ({ activeButton, onChange }: ViewSwitchProps) => {
   return (
      <Stack direction="row">
         <SwitchButton
            direction="left"
            isActive={activeButton === "watchlist"}
            onChange={() => onChange("watchlist")}
         />
         <SwitchButton direction="right" isActive={activeButton === "watched"} onChange={() => onChange("watched")} />
      </Stack>
   );
};

export default ViewSwitch;
