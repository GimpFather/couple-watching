import { Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { useLogout } from "../../api/hooks/auth";
import { usePairRequests, useRespondToPairRequest, useSendPairRequest } from "../../api/hooks/pairs";

const DashboardPage = () => {
   const { user } = useAuthContext();
   console.log(user);
   const { mutate } = useLogout();
   const { mutate: sendRequest } = useSendPairRequest();
   const { data } = usePairRequests(user!.uid);
   const { mutate: respondToRequest } = useRespondToPairRequest();

   const handleLogout = () => {
      mutate();
   };

   const handleInviteUserToCouple = () => {
      sendRequest({ from: user!.uid, to: "RPvPbiTNWEQH1qCrKpT0zQyElwE3" });
   };

   const handleRespondToRequest = (accept: boolean, id: string) => {
      respondToRequest({ requestId: id, accept });
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
