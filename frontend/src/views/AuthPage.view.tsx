import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import NBCard from "../components/NeoBrutalism/NBCard";
import AuthForm from "../components/Auth/AuthForm";

// This page is the entry point for the application.
// But for the sake of development, I dump everything here.

const AuthPage = () => {
   return (
      <Container maxWidth="sm" sx={{ paddingY: "24px" }}>
         <NBCard sx={{ padding: "16px" }}>
            <AuthForm type="signin" />
            <Divider sx={{ margin: "24px 0" }} />
            <AuthForm type="signup" />
         </NBCard>
      </Container>
   );
};
export default AuthPage;
