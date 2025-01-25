import { Button, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { motion } from "motion/react";
import { Link } from "react-router";
import Loading from "../../components/General/Loading";

const DashboardPage = () => {
   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Stack
            spacing={2}
            direction="row"
            sx={{ padding: 2, backgroundColor: "background.paper", borderRadius: 4 }}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
         >
            <Link to="/hello">
               <Button variant="contained">Przejdź do strony startowej</Button>
            </Link>
         </Stack>
         <Typography variant="h4">Look at this cool loading</Typography>
         <Loading />
      </Stack>
   );
};

export default DashboardPage;
