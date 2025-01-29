import { Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { usePairRequests } from "../../api/hooks/pairs";

const DashboardPage = () => {
   const { user, logout, respondToPairRequest, sendPairRequest } = useAuthContext();
   const { data } = usePairRequests(user!.uid);

   const handleLogout = () => {
      logout();
   };

   const handleInviteUserToCouple = () => {
      sendPairRequest({ from: user!.uid, to: "pNTcBgd2ScRwLznjnQVuMhq3OSC3" });
   };

   const handleRespondToRequest = (accept: boolean, id: string) => {
      respondToPairRequest({ requestId: id, accept });
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
         <Button onClick={() => handleInviteUserToCouple()}>Zaproś usera</Button>
         <Stack spacing={2} sx={{ padding: 2, borderRadius: 4, backgroundColor: "background.paper" }}>
            <Typography variant="h6">Pair Requests</Typography>
            {data?.map((request) => (
               <Stack key={request.id} direction="row" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handleRespondToRequest(true, request.id)}>
                     Accept
                  </Button>
                  <Button variant="outlined" onClick={() => handleRespondToRequest(false, request.id)}>
                     Reject
                  </Button>
               </Stack>
            ))}
         </Stack>
      </Stack>
   );
};

export default DashboardPage;
