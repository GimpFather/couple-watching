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
import { FormattedMessage } from "react-intl";
import CheersEmoji from "../../assets/lottie/cheers.json";
import AnimatedEmoji from "../../components/General/AnimatedEmoji";
import WaveEmoji from "../../assets/lottie/wave.json";
import LoveLetter from "../../assets/lottie/letter.json";

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
                  title={
                     <FormattedMessage id="DASHBOARD.INFO_SECTION.TITLE.WELCOME" values={{ name: user.displayName }} />
                  }
                  subtitle={<FormattedMessage id="DASHBOARD.INFO_SECTION.SUBTITLE.WELCOME" />}
                  emoji={<AnimatedEmoji emoji={WaveEmoji} width={80} height={80} />}
               />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
               <InfoSection
                  title={<FormattedMessage id="DASHBOARD.INFO_SECTION.TITLE.FEEDBACK" />}
                  subtitle={<FormattedMessage id="DASHBOARD.INFO_SECTION.SUBTITLE.FEEDBACK" />}
                  emoji={<AnimatedEmoji emoji={LoveLetter} width={80} height={80} />}
               />
            </Grid>
            <Grid size={12}>
               {!pairData ? (
                  <InfoSection
                     title={<FormattedMessage id="DASHBOARD.INFO_SECTION.TITLE.MAIDENLESS" />}
                     subtitle={<FormattedMessage id="DASHBOARD.INFO_SECTION.SUBTITLE.MAIDENLESS" />}
                     emoji={"👥"}
                     primaryButton={{
                        icon: <WavingHandIcon />,
                        caption: <FormattedMessage id="DASHBOARD.INFO_SECTION.SUBTITLE.MAIDENLESS.BUTTON" />,
                        action: () => setOpen(true),
                     }}
                  />
               ) : (
                  <InfoSection
                     title={<FormattedMessage id="DASHBOARD.INFO_SECTION.TITLE.COUPLE" />}
                     subtitle={<FormattedMessage id="DASHBOARD.INFO_SECTION.SUBTITLE.COUPLE" />}
                     emoji={<AnimatedEmoji emoji={CheersEmoji} width={80} height={80} />}
                  />
               )}
            </Grid>
         </Grid>
         <Button startIcon={<LogoutIcon />} onClick={() => handleLogout()}>
            <FormattedMessage id="DASHBOARD.LOGOUT" />
         </Button>
         <InviteDialog open={open} handleClose={() => setOpen(false)} />
      </Stack>
   );
};

export default DashboardPage;
