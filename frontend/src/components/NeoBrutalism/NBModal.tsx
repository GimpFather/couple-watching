import { memo } from "react";
import { styled } from "@mui/material/styles";
import Modal, { type ModalProps } from "@mui/material/Modal";
import { AnimatePresence, motion, type MotionProps } from "motion/react";

type CustomModalProps = Omit<ModalProps, "initial" | "animate" | "exit" | "transition"> & {
   initial?: MotionProps;
   animate?: MotionProps;
   exit?: MotionProps;
   transition?: MotionProps;
};

const CustomModal = styled(Modal)(() => ({
   marginLeft: "8px",
   marginRight: "8px",
   marginBottom: "28px",
   position: "fixed",
   bottom: 0,
   left: 0,
   right: 0,
   top: "auto",
}));

const CustomModalContent = styled(motion.div)(({ theme }) => ({
   padding: "20px 16px 16px 16px",
   backgroundColor: theme.palette.background.paper,
   borderRadius: "12px",
   border: `0.094rem solid ${theme.palette.common.black}`,
   "&:focus-visible": {
      outline: "none", // This might be needed for accessibility reasons.
   },
}));

const NBModal = ({ children, ...props }: CustomModalProps) => {
   return (
      <AnimatePresence mode="wait" initial={false}>
         {props.open && (
            <CustomModal
               component={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
               {...props}
            >
               <CustomModalContent
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
               >
                  {children}
               </CustomModalContent>
            </CustomModal>
         )}
      </AnimatePresence>
   );
};

export default memo(NBModal);
