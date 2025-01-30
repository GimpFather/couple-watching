import { Card, Stack, TextField, Typography } from "@mui/material";
import FlipIcon from "../Watchlist/MovieCard/FlipIcon";
import Button from "../General/Button";
import { Controller, useForm } from "react-hook-form";
import { RegisterInput } from "../../types/Inputs.types";
import { useRegister } from "../../api/hooks/auth";
import { FormattedMessage } from "react-intl";

type RegisterSideProps = {
   handleFlip: () => void;
};

const RegisterSide = ({ handleFlip }: RegisterSideProps) => {
   const { mutate: mutateRegister } = useRegister();
   const { watch, control } = useForm<RegisterInput>();
   const { displayName, email, password } = watch();

   const handleRegister = async () => {
      mutateRegister({
         displayName,
         email,
         password,
      });
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
            backgroundColor: "background.paper",
            overflow: "hidden",
            boxShadow: 3,
            transform: "rotateY(180deg)",
         }}
      >
         <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack spacing={1}>
               <Stack justifyContent="space-between" alignItems="center" direction="row">
                  <Typography variant="h4" color="primary" fontWeight={800}>
                     <FormattedMessage id="AUTH.REGISTER.TITLE" />
                  </Typography>
                  <FlipIcon handleClick={() => handleFlip()} dark />
               </Stack>
               <Typography>
                  <FormattedMessage id="AUTH.REGISTER.SUBTITLE" />
               </Typography>
            </Stack>
            <Stack spacing={2}>
               <Controller
                  name="displayName"
                  control={control}
                  render={({ field }) => (
                     <TextField {...field} label={<FormattedMessage id="AUTH.REGISTER.LABEL.NICKNAME" />} />
                  )}
               />
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <TextField {...field} label={<FormattedMessage id="AUTH.REGISTER.LABEL.EMAIL" />} />
                  )}
               />
               <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                     <TextField
                        {...field}
                        type="password"
                        label={<FormattedMessage id="AUTH.REGISTER.LABEL.PASSWORD" />}
                     />
                  )}
               />
               <Typography>
                  <FormattedMessage id="AUTH.REGISTER.LABEL.DESC" />
               </Typography>
            </Stack>
            <Stack alignItems="center">
               <Button onClick={() => handleRegister()}>
                  <FormattedMessage id="AUTH.REGISTER.BUTTON" />
               </Button>
            </Stack>
         </Stack>
      </Card>
   );
};

export default RegisterSide;
