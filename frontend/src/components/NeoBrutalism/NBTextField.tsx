import { memo } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import InputBase, { type InputBaseProps } from "@mui/material/InputBase";

const CustomTextField = styled(InputBase)(({ theme }) => ({
   padding: "9.5px 12px",
   border: `0.094rem solid ${theme.palette.common.black}`,
   borderRadius: 12,
   backgroundColor: theme.palette.accent[50],
   color: theme.palette.common.black,
   "& .MuiInputBase-input": {
      ...theme.typography.emphasizedBodyMedium,
      padding: 0,
   },
   "& .MuiInputBase-input::placeholder": {
      opacity: 1,
      color: theme.palette.accent[500],
   },
}));

const CustomInputAdornment = styled(InputAdornment)(({ theme, position }) => ({
   color: theme.palette.common.black,
   ...(position === "start" && {
      marginLeft: 0,
   }),
   ...(position === "end" && {
      marginRight: 0,
   }),
}));

type Adornment = {
   position: "start" | "end";
   icon: React.ReactNode;
};

type NBTextFieldProps = InputBaseProps &
   InputBaseProps & {
      adornment?: Adornment;
   };

const NBTextField = ({ adornment, ...props }: NBTextFieldProps) => {
   return (
      <CustomTextField
         {...(adornment && {
            ...(adornment.position === "start" && {
               startAdornment: <CustomInputAdornment position="start">{adornment.icon}</CustomInputAdornment>,
            }),
            ...(adornment.position === "end" && {
               endAdornment: <CustomInputAdornment position="end">{adornment.icon}</CustomInputAdornment>,
            }),
         })}
         {...props}
      />
   );
};

export default memo(NBTextField);
