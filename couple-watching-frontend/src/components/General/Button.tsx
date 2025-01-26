import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";
import { motion } from "motion/react";

type ButtonProps = MUIButtonProps & {
   dark?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, dark = false, ...props }) => {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.9 }}
         style={{ width: "fit-content" }}
      >
         <MUIButton
            variant="contained"
            sx={{
               ...(dark && {
                  color: "background.paper",
                  "&:hover": {
                     backgroundColor: "primary.main",
                  },
               }),
            }}
            {...props}
         >
            {children}
         </MUIButton>
      </motion.div>
   );
};

export default Button;
