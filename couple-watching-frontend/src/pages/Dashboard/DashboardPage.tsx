import { Grid2 as Grid, Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import { useAuthContext } from "../../context/AuthProvider";
import Button from "../../components/General/Button";
import { usePair, useRespondToPairRequest } from "../../api/hooks/pairs";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoSection from "../../components/General/InfoSection";
import InviteDialog from "../../components/Dashboard/InviteDialog";
import React from "react";
import { FormattedMessage } from "react-intl";
import CheersEmoji from "../../assets/lottie/cheers.json";
import AnimatedEmoji from "../../components/General/AnimatedEmoji";
import WaveEmoji from "../../assets/lottie/wave.json";
import LoveLetter from "../../assets/lottie/letter.json";
import ResponseDialog from "../../components/Dashboard/ResponseDialog";
import { toast } from "react-toastify";

const DashboardPage = () => {
   const { user, logout } = useAuthContext();
   const { data: pairData } = usePair(user!.uid);
   const { mutate: respondToPairRequest } = useRespondToPairRequest();

   const fromUid = new URLSearchParams(window.location.search).get("invFromId");
   const from = new URLSearchParams(window.location.search).get("invFrom");

   const [openInvDialog, setOpenInvDialog] = React.useState<boolean>(false);
   const [openResponseDialog, setOpenResponseDialog] = React.useState<boolean>(!!fromUid && !!from);

   if (!user) return null;

   const handleLogout = () => {
      logout();
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="DASHBOARD.HEADER" subtitle="DASHBOARD.SUBTITLE" />
         <Grid container spacing={4} justifyContent="center">
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
                        action: () => setOpenInvDialog(true),
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
         <InviteDialog open={openInvDialog} handleClose={() => setOpenInvDialog(false)} />
         {fromUid && from && (
            <ResponseDialog
               open={openResponseDialog}
               handleClose={() => setOpenResponseDialog(false)}
               invName={from}
               handleResponse={() => {
                  respondToPairRequest(
                     {
                        personOne: { displayName: from, uid: fromUid },
                        personTwo: { displayName: user.displayName || "", uid: user.uid },
                     },
                     {
                        onSuccess: () => {
                           toast("You've successfully paired with " + from);
                        },
                        onError: () => {
                           toast("An error occurred while pairing with " + from);
                        },
                     }
                  );
                  setOpenResponseDialog(false);
               }}
            />
         )}
      </Stack>
   );
};

export default DashboardPage;
