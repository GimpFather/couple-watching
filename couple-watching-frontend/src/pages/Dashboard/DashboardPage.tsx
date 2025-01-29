import { Grid2 as Grid, Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { usePair, usePairRequests } from "../../api/hooks/pairs";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoSection from "../../components/General/InfoSection";
import PairRequestNotification from "../../components/Dashboard/PairRequestNotification";
import InviteDialog from "../../components/Dashboard/InviteDialog";
import React from "react";

const DashboardPage = () => {
   const { user, logout } = useAuthContext();
   const { data: pairRequestsData } = usePairRequests(user!.uid);
   const { data: pairData } = usePair(user!.uid);

   const [open, setOpen] = React.useState(false);

   if (!user) return null;

   const handleLogout = () => {
      logout();
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Grid container spacing={4} justifyContent="center">
            <Grid size={12}>
               {pairRequestsData && pairRequestsData.length > 0 && (
                  <Stack spacing={2}>
                     {pairRequestsData?.map((request) => (
                        <PairRequestNotification key={request.id} inviter={request.inviterName} invId={request.id} />
                     ))}
                  </Stack>
               )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
               <InfoSection
                  title={`Welcome ${user.displayName}!`}
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
               {!pairData ? (
                  <InfoSection
                     title={"Still maidenless?"}
                     subtitle={
                        "Looks like you’re flying solo in this watchlist! To unlock the full couple experience, invite your partner/friend/whatever to join you on your journey. After all, what’s a watchlist without a co-op partner? Make it official and share the fun!"
                     }
                     emoji={"👥"}
                     primaryButton={{
                        icon: <WavingHandIcon />,
                        caption: "Invite your partner",
                        action: () => setOpen(true),
                     }}
                  />
               ) : (
                  <InfoSection
                     title={"You became a couple!"}
                     subtitle={
                        "Congratulations! You and your partner are now officially a couple in this watchlist. 🎉 Now you can share your favorite movies and TV shows with each other, and enjoy the full couple experience. Cheers to that!"
                     }
                     emoji={"🥂"}
                  />
               )}
            </Grid>
         </Grid>
         <Button startIcon={<LogoutIcon />} onClick={() => handleLogout()}>
            Logout
         </Button>
         <InviteDialog open={open} handleClose={() => setOpen(false)} />
      </Stack>
   );
};

export default DashboardPage;
