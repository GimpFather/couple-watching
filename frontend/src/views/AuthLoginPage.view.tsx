import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import PhoneContainer from "~/components/Custom/PhoneContainer";
import NBButton from "~/components/NeoBrutalism/NBButton";

const AuthLoginPage = () => {
   const navigate = useNavigate();
   return (
      <PhoneContainer direction="backward">
         <Typography variant="headingLarge">Sign in</Typography>
         <NBButton onClick={() => navigate("/")}>Go back</NBButton>
      </PhoneContainer>
   );
};
export default AuthLoginPage;
