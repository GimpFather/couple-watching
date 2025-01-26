import { Card, Stack, TextField, Typography } from "@mui/material";
import FlipIcon from "../Watchlist/MovieCard/FlipIcon";
import Button from "../General/Button";

type RegisterSideProps = {
   handleFlip: () => void;
};

const RegisterSide = ({ handleFlip }: RegisterSideProps) => {
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
                     Register
                  </Typography>
                  <FlipIcon handleClick={() => handleFlip()} dark />
               </Stack>
               <Typography>✨ Awww, that's soo cool you decide to join us! It means so much to me! 😊</Typography>
            </Stack>
            <Stack spacing={2}>
               <TextField label="Let's start with your nickname" />
               <TextField type="mail" label="Now your mail" />
               <TextField type="password" label="And finally, your password" />
               <Typography>
                  When you will be ready, just click button bellow! We gonna need couple more things to make your
                  account! 😎
               </Typography>
            </Stack>
            <Stack alignItems="center">
               <Button>Okey! What's next?</Button>
            </Stack>
         </Stack>
      </Card>
   );
};

export default RegisterSide;
