import { Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { useLogout } from "../../api/hooks/auth";

const DashboardPage = () => {
   const { user } = useAuthContext();
   const { mutate } = useLogout();

   const handleLogout = () => {
      mutate();
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Stack spacing={2} sx={{ padding: 2, borderRadius: 4, backgroundColor: "background.paper" }}>
            <Typography variant="h6">Welcome {user?.email}</Typography>
            <Button variant="outlined" onClick={() => handleLogout()}>
               Logout
            </Button>
         </Stack>
      </Stack>
   );
};

export default DashboardPage;
