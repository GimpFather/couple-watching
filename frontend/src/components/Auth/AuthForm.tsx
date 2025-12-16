import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import NBButton from "~/components/NeoBrutalism/NBButton";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import { useAuth } from "~/context/auth/useAuth";
import showToast from "../Toasts/showToast";
import { MESSAGES } from "~/locales/en";
import { SOUNDS } from "~/hooks/sounds.config";
import { useSound } from "~/hooks/useSound";

type AuthFormProps = {
   type: "register" | "login";
};

const AuthForm = ({ type }: AuthFormProps) => {
   const { REGISTER, LOGIN } = MESSAGES.AUTH;
   const { login, signUp } = useAuth();
   const { playSound } = useSound();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const isRegister = type === "register";
   const buttonText = isRegister ? REGISTER.FORM.BUTTON.CREATE_ACCOUNT : LOGIN.FORM.BUTTON.LOG_IN;
   const emailLabel = isRegister ? REGISTER.FORM.EMAIL.LABEL : LOGIN.FORM.EMAIL.LABEL;
   const passwordLabel = isRegister ? REGISTER.FORM.PASSWORD.LABEL : LOGIN.FORM.PASSWORD.LABEL;
   const emailPlaceholder = isRegister ? REGISTER.FORM.EMAIL.PLACEHOLDER : LOGIN.FORM.EMAIL.PLACEHOLDER;
   const passwordPlaceholder = isRegister ? REGISTER.FORM.PASSWORD.PLACEHOLDER : LOGIN.FORM.PASSWORD.PLACEHOLDER;

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email || !password) {
         playSound(SOUNDS.MEME_ALERT_WHAT.url);
         showToast({
            title: "🤔 Buddy please.",
            description: "Have you ever thought about the importance of filling in all the fields?",
            color: "warning",
         });
         return;
      }
      if (isRegister) {
         await signUp(email, password);
      } else {
         await login(email, password);
      }
   };

   return (
      <Stack gap="20px" component="form" onSubmit={handleSubmit}>
         <Stack gap="12px">
            <Stack>
               <Typography variant="bodyMedium">{emailLabel}</Typography>
               <NBTextField
                  placeholder={emailPlaceholder}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
               />
            </Stack>
            <Stack>
               <Typography variant="bodyMedium">{passwordLabel}</Typography>
               <NBTextField
                  placeholder={passwordPlaceholder}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  adornment={{
                     position: "end",
                     icon: !showPassword ? (
                        <EyeIcon onClick={() => setShowPassword(!showPassword)} cursor="pointer" size={20} />
                     ) : (
                        <EyeSlashIcon onClick={() => setShowPassword(!showPassword)} cursor="pointer" size={20} />
                     ),
                  }}
               />
            </Stack>
         </Stack>
         <NBButton type="submit">{buttonText}</NBButton>
      </Stack>
   );
};

export default AuthForm;
