import { Button, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { Link } from "react-router";
import Loading from "../../components/General/Loading";

const DashboardPage = () => {
   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Typography variant="h4">Look at this cool onboarding page</Typography>
         <Link to="/hello">
            <Button variant="contained">Go to onboarding page</Button>
         </Link>
         <Typography variant="h4">Look at this cool loading</Typography>
         <Loading />
      </Stack>
   );
};

export default DashboardPage;
