import { Button, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { Link } from "react-router";
import Loading from "../../components/General/Loading";
import React from "react";

const DashboardPage = () => {
   const [first, setfirst] = React.useState(true);
   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Typography variant="h4">Look at this cool onboarding page</Typography>
         <Link to="/hello">
            <Button variant="contained">Go to onboarding page</Button>
         </Link>
         <Typography onClick={() => setfirst(!first)} variant="h4">
            Look at this cool loading, click to toggle
         </Typography>
         <Loading isLoading={first} />
      </Stack>
   );
};

export default DashboardPage;
