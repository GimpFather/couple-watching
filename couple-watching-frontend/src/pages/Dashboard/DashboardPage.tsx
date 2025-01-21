import { Button, Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { motion } from "motion/react";
import { Link } from "react-router";

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
      </Stack>
   );
};

export default DashboardPage;
