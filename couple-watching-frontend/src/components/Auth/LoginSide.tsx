import { Card, Stack, Typography, TextField, useTheme } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { motion } from "motion/react";
import Button from "../General/Button";
import { FormattedMessage } from "react-intl";
import { Controller, useForm } from "react-hook-form";
import { SignInInput } from "../../types/Inputs.types";
import { useLogin } from "../../api/hooks/auth";
import { useNavigate } from "react-router";

type LoginSideProps = {
   handleFlip: () => void;
};

const LoginSide = ({ handleFlip }: LoginSideProps) => {
   const { mutate } = useLogin();
   const { watch, control } = useForm<SignInInput>();
   const { email, password } = watch();
   const { palette } = useTheme();
   const navigate = useNavigate();

   const handleLogin = () => {
      mutate(
         { email, password },
         {
            onSuccess: () => {
               navigate("/dashboard");
            },
            onError: () => {
               alert("Error");
            },
         }
      );
   };

   return (
      <Card
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            padding: 2,
            width: 350,
            height: 500,
            borderRadius: 4,
            border: "3px solid",
            borderColor: "primary.main",
            overflow: "hidden",
            boxShadow: 3,
         }}
      >
         <Stack justifyContent="space-evenly" alignItems="center" sx={{ height: "100%" }}>
            <Stack spacing={1} alignItems="center">
               <Typography variant="h4" color="primary" fontWeight={700}>
                  <FormattedMessage id="START.AUTH_CARD.LOGIN.TITLE" />
               </Typography>
               <Typography variant="body1" sx={{ textAlign: "center" }}>
                  <FormattedMessage id="START.AUTH_CARD.LOGIN.SUBTITLE" />
               </Typography>
            </Stack>
            <Stack spacing={2}>
               <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                     <TextField
                        {...field}
                        type="email"
                        slotProps={{
                           input: {
                              endAdornment: <EmailIcon />,
                           },
                        }}
                        label={<FormattedMessage id="START.AUTH_CARD.LOGIN.FIELD.EMAIL.LABEL" />}
                     />
                  )}
               />
               <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                     <TextField
                        {...field}
                        type="password"
                        slotProps={{ input: { endAdornment: <PasswordIcon /> } }}
                        label={<FormattedMessage id="START.AUTH_CARD.LOGIN.FIELD.PASSWORD.LABEL" />}
                     />
                  )}
               />
            </Stack>
            <Stack spacing={2} alignItems="center">
               <Button startIcon={<LoginIcon />} onClick={() => handleLogin()}>
                  <FormattedMessage id="START.AUTH_CARD.LOGIN.BUTTON.PRIMARY" />
               </Button>
               <Typography
                  component={motion.div}
                  whileHover={{ color: palette.primary.main }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFlip()}
                  sx={{ cursor: "pointer" }}
               >
                  <FormattedMessage id="START.AUTH_CARD.LOGIN.NOT_A_MEMBER_YET" />
               </Typography>
            </Stack>
         </Stack>
      </Card>
   );
};

export default LoginSide;
