import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { usePairRequests } from "../../api/hooks/pairs";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoSection from "../../components/General/InfoSection";

const DashboardPage = () => {
   const { user, userData, logout, respondToPairRequest, sendPairRequest } = useAuthContext();
   const { data: pairRequestsData } = usePairRequests(user!.uid);

   if (!user || !userData) return null;

   const handleLogout = () => {
      logout();
   };

   const handleInviteUserToCouple = () => {
      sendPairRequest({ from: user!.uid, to: "TG8jlmm8yNXzjxspy7moooCnmrM2" });
   };

   const handleRespondToRequest = (accept: boolean, id: string) => {
      respondToPairRequest({ requestId: id, accept });
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, md: 6 }}>
               <InfoSection
                  title={`Welcome ${userData.displayName}!`}
                  subtitle="I’m so glad to see you here! I really appreciate you signing up and logging in to the app. 😊 Now, let’s dive in and explore it together!"
                  emoji={"👋"}
               />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
               <InfoSection
                  title="Wanna give me some feedback?"
                  subtitle="I’m always looking to improve and make your experience better. If you have any feedback, suggestions, or just want to say hi, feel free to reach out to me. I’m here for you!"
                  emoji={"📫"}
               />
            </Grid>
            <Grid size={12}>
               <InfoSection
                  title={"Still maidenless?"}
                  subtitle={
                     "Looks like you’re flying solo in this watchlist! To unlock the full couple experience, invite your partner/friend/whatever to join you on your journey. After all, what’s a watchlist without a co-op partner? Make it official and share the fun!"
                  }
                  emoji={"👥"}
                  primaryButton={{
                     icon: <WavingHandIcon />,
                     caption: "Invite your partner",
                     action: () => handleInviteUserToCouple(),
                  }}
               />
            </Grid>
         </Grid>
         {pairRequestsData && pairRequestsData.length > 0 && (
            <Stack spacing={2} sx={{ padding: 2, borderRadius: 4, backgroundColor: "background.paper" }}>
               <Typography variant="h6">Pair Requests</Typography>
               {pairRequestsData?.map((request) => (
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
         )}
         <Button startIcon={<LogoutIcon />} onClick={() => handleLogout()}>
            Logout
         </Button>
      </Stack>
   );
};

export default DashboardPage;
