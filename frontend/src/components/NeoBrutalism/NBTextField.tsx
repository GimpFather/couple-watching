import { memo } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { motion, type MotionProps } from "motion/react";

const MotionTextField = motion.create(TextField);

const CustomTextField = styled(MotionTextField)(({ theme }) => ({
   "& .MuiInputLabel-root": {
      ...theme.typography.emphasizedBodyMedium,
      color: theme.palette.common[500],
      "&.Mui-focused": {
         color: theme.palette.common.black,
      },
   },
   "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: theme.palette.common[50],
      "&.Mui-focused": {
         backgroundColor: theme.palette.common.white,
      },
      "& input": {
         ...theme.typography.emphasizedBodyMedium,
         color: theme.palette.common[500],
         padding: "7.5px 12px 7.5px 8px",
      },
      "& input:not(:placeholder-shown)": {
         color: theme.palette.common.black,
      },
      "& fieldset": {
         border: `1.5px solid ${theme.palette.common.black}`,
      },
      "&:hover fieldset": {
         border: `1.5px solid ${theme.palette.common.black}`,
         boxShadow: "none",
         outline: "none",
      },
      "&.Mui-focused fieldset": {
         border: `1.5px solid ${theme.palette.common.black}`,
         boxShadow: "none",
         outline: "none",
      },
      "& .MuiInputAdornment-root": {
         color: theme.palette.common[500],
      },
      "&.Mui-focused .MuiInputAdornment-root": {
         color: theme.palette.common.black,
      },
   },
}));

type Adornment = {
   position: "start" | "end";
   icon: React.ReactNode;
};

type NBTextFieldProps = TextFieldProps &
   MotionProps & {
      adornment?: Adornment;
   };

const NBTextField = ({ adornment, ...props }: NBTextFieldProps) => {
   return (
      <CustomTextField
         variant="outlined"
         {...(adornment && {
            slotProps: {
               input: {
                  ...(adornment.position === "start" && {
                     startAdornment: (
                        <InputAdornment position={adornment.position} sx={{ marginRight: 0 }}>
                           {adornment.icon}
                        </InputAdornment>
                     ),
                  }),
                  ...(adornment.position === "end" && {
                     endAdornment: (
                        <InputAdornment position={adornment.position} sx={{ marginRight: 0 }}>
                           {adornment.icon}
                        </InputAdornment>
                     ),
                  }),
               },
            },
         })}
         {...props}
      />
   );
};

export default memo(NBTextField);
