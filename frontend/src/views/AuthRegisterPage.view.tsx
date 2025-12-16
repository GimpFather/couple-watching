import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import PhoneContainer from "~/components/Custom/PhoneContainer";
import NBButton from "~/components/NeoBrutalism/NBButton";

const AuthRegisterPage = () => {
   const navigate = useNavigate();
   return (
      <PhoneContainer direction="backward">
         <Typography variant="headingLarge">Register</Typography>
         <NBButton onClick={() => navigate("/")}>Go back</NBButton>
      </PhoneContainer>
   );
};
export default AuthRegisterPage;
