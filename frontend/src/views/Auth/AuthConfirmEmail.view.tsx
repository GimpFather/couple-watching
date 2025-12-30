import Typography from "@mui/material/Typography";
import { ArrowLeftIcon, MailboxIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import OTPInput from "react-otp-input";
import { supabaseClient } from "~/api/client";
import showToast from "~/components/Toasts/showToast";

const AuthConfirmEmailPage = () => {
   const handleNavigationTransition = useNavigationTransition();
   const { state } = useLocation();
   const [errorState, setErrorState] = useState<boolean>(false);

   const emailFromState = state?.email as string | undefined;
   const emailFromStorage = localStorage.getItem("pendingEmailVerification");
   const email = emailFromState || emailFromStorage;

   if (!email) {
      return <Navigate to="/auth/login" />;
   }

   const [userCode, setUserCode] = useState("");

   const handleConfirmEmail = async (code: string) => {
      const { error } = await supabaseClient.auth.verifyOtp({
         email: email,
         token: code,
         type: "signup",
      });
      if (error) {
         setErrorState(true);
         showToast({
            title: "Verification error",
            color: "danger",
            description: error.message,
         });
      } else {
         localStorage.removeItem("pendingEmailVerification");
         handleNavigationTransition("/auth/success");
      }
   };

   const handleResendCode = async () => {
      if (!email) return;

      const { error } = await supabaseClient.auth.resend({
         type: "signup",
         email: email,
      });

      if (error) {
         showToast({
            title: "Error",
            color: "danger",
            description: error.message,
         });
      } else {
         showToast({
            title: "Code sent",
            color: "success",
            description: "New verification code has been sent to your email.",
         });
         setErrorState(false);
         setUserCode("");
      }
   };

   const handlePutStarsInEmail = (email: string) => {
      const emailParts = email.split("@");
      const username = emailParts[0];
      const domain = emailParts[1];

      const visibleChars = Math.min(7, username.length);
      const visiblePart = username.substring(0, visibleChars);
      const maskedPart = "*".repeat(Math.max(0, username.length - visibleChars));

      return `${visiblePart}${maskedPart}@${domain}`;
   };

   return (
      <PhoneContainer>
         <ArrowLeftIcon
            style={{ marginBottom: "24px" }}
            cursor="pointer"
            size={18}
            onClick={() => handleNavigationTransition("/")}
         />
         <Stack gap="24px" alignItems="center" sx={{ marginBottom: "12px" }}>
            <Stack alignItems="center" gap="20px">
               <MailboxIcon size={80} weight="duotone" />
               <Stack alignItems="center" gap="8px">
                  <Typography variant="headingLarge">We’ve sent you an email</Typography>
                  <Stack alignItems="center">
                     <Typography variant="bodyMedium">Please enter the verification code we sent to</Typography>
                     <Typography variant="bodyMedium">{handlePutStarsInEmail(email)}</Typography>
                  </Stack>
               </Stack>
            </Stack>
            <OTPInput
               renderInput={(props) => (
                  <NBTextField
                     sx={{
                        borderColor: errorState ? "danger.main" : "common.black",
                        backgroundColor: errorState ? "danger.50" : "common.white",
                     }}
                     inputProps={{
                        ...props,
                     }}
                  />
               )}
               value={userCode}
               onChange={(value) => {
                  setUserCode(value);
                  if (errorState && value.length > 0) {
                     setErrorState(false);
                  }
                  if (value.length === 6) {
                     handleConfirmEmail(value);
                  }
               }}
               onPaste={(event) => {
                  const value = event.clipboardData.getData("text");
                  setUserCode(value);
               }}
               numInputs={6}
               shouldAutoFocus={true}
               containerStyle={{ gap: "6px" }}
               inputStyle={{
                  fontSize: "20px",
                  textAlign: "center",
                  width: "24px",
                  height: "29px",
               }}
            />
         </Stack>
         <Stack alignItems="center">
            {errorState && (
               <Typography variant="bodyMedium" color="danger.main">
                  Incorrect code, please try again
               </Typography>
            )}
            <Typography variant="bodyMedium" color="accent.500">
               Didn't receive the code?{" "}
               <Typography
                  variant="bodyMedium"
                  color="primary.700"
                  component="span"
                  sx={{
                     cursor: "pointer",
                  }}
                  onClick={handleResendCode}
               >
                  Resend
               </Typography>
            </Typography>
         </Stack>
      </PhoneContainer>
   );
};
export default AuthConfirmEmailPage;
