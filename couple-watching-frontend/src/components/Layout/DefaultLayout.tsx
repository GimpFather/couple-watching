import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Container } from "@mui/material";

const DefaultLayout = () => {
   return (
      <>
         <Container maxWidth="xl" sx={{ paddingY: 2 }}>
            <Outlet />
         </Container>
         <Navbar />
      </>
   );
};

export default DefaultLayout;
