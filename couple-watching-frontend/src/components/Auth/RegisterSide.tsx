import { Card, Stack } from "@mui/material";
import FlipIcon from "../Watchlist/MovieCard/FlipIcon";

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
         <Stack direction="row" justifyContent="space-between">
            <FlipIcon handleClick={() => handleFlip()} dark />
         </Stack>
      </Card>
   );
};

export default RegisterSide;
