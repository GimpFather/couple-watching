import { memo } from "react";
import ButtonBase, { type ButtonBaseProps as ButtonBaseProps } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import type { CustomColorOptions, CommonColors } from "@mui/material/styles";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSound } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

type NBButtonProps = Omit<ButtonBaseProps, "color"> & {
   loading?: boolean;
   color?: CustomColorOptions;
   icon?: React.ReactNode;
};

const INITIAL_Y = -4;

const CustomButtonBase = styled(ButtonBase)<{ color?: CustomColorOptions }>(({ theme, color }) => {
   const bodyColor = color ? (theme.palette[color] as CommonColors) : theme.palette.primary;
   const captionColor =
      color === "danger" || color === "success" ? theme.palette.common.white : theme.palette.common.dark;

   return {
      ...theme.typography.emphasizedBodyMedium,
      padding: "0px 24px",
      position: "relative",
      height: 40,
      width: "100%",
      alignItems: "center",
      backgroundColor: bodyColor.main,
      color: captionColor,
      border: "0.094rem solid",
      borderColor: theme.palette.common.black,
      borderRadius: "12px",
      "&:disabled": {
         backgroundColor: theme.palette.accent[500],
         color: theme.palette.accent[200],
         borderColor: theme.palette.accent[800],
         cursor: "not-allowed",
      },
   };
});

const BottomLayer = styled(motion.div)<{ color?: CustomColorOptions }>(({ theme, color }) => {
   const shadowColor = color ? (theme.palette[color] as CommonColors) : theme.palette.primary;

   return {
      position: "absolute",
      height: 36,
      width: "100%",
      backgroundColor: shadowColor.dark,
      border: "2px solid black",
      borderRadius: 12,
   };
});

const IconContainer = styled("span")(() => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   marginRight: 8,
   svg: {
      width: 24,
      height: 24,
   },
}));

const NBButton: React.FC<NBButtonProps> = ({ children, loading, color, icon, disabled, ...props }) => {
   const { playSound } = useSound();

   const y = useMotionValue(INITIAL_Y);
   const ySpring = useSpring(y, { stiffness: 500, damping: 30 });

   const isEnabled = !disabled;

   return (
      <motion.div
         style={{
            position: "relative",
            width: "auto",
         }}
      >
         {isEnabled && <BottomLayer color={color} style={{ y: -INITIAL_Y }} />}
         <motion.div
            style={{ y: disabled ? 0 : ySpring }}
            onTapStart={() => {
               y.set(0);
            }}
            onTapCancel={() => {
               y.set(INITIAL_Y);
            }}
            onPointerUp={() => {
               y.set(INITIAL_Y);
               if (isEnabled) {
                  playSound(SOUNDS.BUTTON_RUSTY_CLICK_END.url);
               }
            }}
            onPointerDown={() => {
               if (isEnabled) {
                  playSound(SOUNDS.BUTTON_RUSTY_CLICK_START.url);
               }
            }}
         >
            <CustomButtonBase disableRipple disabled={loading || disabled} color={color} {...props}>
               {icon && <IconContainer>{icon}</IconContainer>}
               {children}
            </CustomButtonBase>
         </motion.div>
      </motion.div>
   );
};

export default memo(NBButton);
