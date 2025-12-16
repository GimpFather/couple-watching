import { memo } from "react";
import Typography from "@mui/material/Typography";
import MUIButton, { type ButtonProps as MUIButtonProps } from "@mui/material/Button";
import type { CustomColorOptions } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSound } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

type NBButtonProps = Omit<MUIButtonProps, "color"> & {
   loading?: boolean;
   color?: CustomColorOptions;
};

const NBButton: React.FC<NBButtonProps> = ({ children, loading, color, ...props }) => {
   const { palette } = useTheme();
   const { playSound } = useSound();
   const DEFAULT_COLOR = palette.primary;
   const INITIAL_Y = -4;
   const y = useMotionValue(INITIAL_Y);
   const ySpring = useSpring(y, { stiffness: 500, damping: 30 });

   const handleButtonClickSound = () => {
      playSound(SOUNDS.BUTTON_RUSTY_CLICK_START.url, {
         volume: SOUNDS.BUTTON_RUSTY_CLICK_START.defaultVolume,
      });
   };

   const handleButtonReleaseSound = () => {
      playSound(SOUNDS.BUTTON_RUSTY_CLICK_END.url, {
         volume: SOUNDS.BUTTON_RUSTY_CLICK_END.defaultVolume,
      });
   };

   return (
      <motion.div
         style={{
            position: "relative",
            ...(props.fullWidth && { width: "100%" }),
         }}
      >
         {!props.disabled && (
            <motion.div
               style={{
                  position: "absolute",
                  y: -INITIAL_Y,
                  height: 36,
                  width: "100%",
                  backgroundColor: color ? palette[color].dark : DEFAULT_COLOR.dark,
                  border: "2px solid black",
                  borderRadius: 12,
               }}
            />
         )}
         <motion.div
            style={{ y: props.disabled ? 0 : ySpring }}
            onTapStart={() => {
               y.set(INITIAL_Y - INITIAL_Y);
            }}
            onTapCancel={() => {
               y.set(INITIAL_Y);
            }}
            onPointerUp={() => {
               y.set(INITIAL_Y);
               handleButtonReleaseSound();
            }}
            onPointerDown={() => {
               handleButtonClickSound();
            }}
         >
            <MUIButton
               variant="contained"
               disableRipple
               disabled={loading}
               {...props}
               sx={{
                  paddingX: 3,
                  position: "relative",
                  height: 40,
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: color ? palette[color].main : DEFAULT_COLOR.main,
                  color: color === "accent" ? palette.common.black : "text.secondary",
                  border: "2px solid black",
                  borderRadius: 3,
                  "&:hover": {
                     backgroundColor: color ? palette[color].light : DEFAULT_COLOR.light,
                     boxShadow: "none",
                  },
                  "&:active": {
                     boxShadow: "none",
                  },
                  "&:disabled": {
                     color: "common.200",
                     backgroundColor: "common.500",
                     borderColor: "common.800",
                     cursor: "not-allowed",
                  },
               }}
            >
               <Typography variant="emphasizedBodyMedium" sx={{ textTransform: "none" }}>
                  {children}
               </Typography>
            </MUIButton>
         </motion.div>
      </motion.div>
   );
};

export default memo(NBButton);
