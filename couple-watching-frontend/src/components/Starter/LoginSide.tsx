import { Card, Stack, Typography, TextField, useTheme } from "@mui/material";
import CustomIconButton from "../General/CustomIconButton";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { motion } from "motion/react";

type LoginSideProps = {
   handleFlip: () => void;
};

const LoginSide = ({ handleFlip }: LoginSideProps) => {
   const { palette } = useTheme();
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
                  Sign in
               </Typography>
               <Typography variant="body1" sx={{ textAlign: "center" }}>
                  ✨ Back for more? Welcome to CUM! 🎬💫 Sign in and let’s roll!
               </Typography>
            </Stack>
            <Stack spacing={2}>
               <TextField
                  slotProps={{
                     input: {
                        endAdornment: <EmailIcon />,
                     },
                  }}
                  label="Email"
               />
               <TextField slotProps={{ input: { endAdornment: <PasswordIcon /> } }} label="Password" />
            </Stack>
            <Stack spacing={2} alignItems="center">
               <CustomIconButton
                  handleOnClick={() => alert("Login")}
                  icon={<LoginIcon />}
                  text={<Typography>Sign in</Typography>}
               />
               <Typography
                  component={motion.div}
                  whileHover={{ color: palette.primary.main }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFlip()}
                  sx={{ cursor: "pointer" }}
               >
                  Not yet a member? Make an account!
               </Typography>
            </Stack>
         </Stack>
      </Card>
   );
};

export default LoginSide;
