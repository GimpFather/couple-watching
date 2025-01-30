import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../General/Button";
import { motion } from "motion/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useRespondToPairRequest } from "../../api/hooks/pairs";
import { useAuthContext } from "../../context/AuthProvider";
import { FormattedMessage } from "react-intl";

type PairRequestNotificationProps = {
   inviter: string;
   invId: string;
};

const PairRequestNotification = ({ inviter, invId }: PairRequestNotificationProps) => {
   const { user } = useAuthContext();
   const { mutate: respondToPairRequest, isPending } = useRespondToPairRequest();

   if (!user) return null;

   return (
      <Accordion
         component={motion.div}
         initial={{ opacity: 0, x: -100 }}
         animate={{ opacity: 1, x: 0 }}
         sx={{ padding: 1, borderRadius: 4 }}
         square
      >
         <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />}>
            <Typography variant="h5" color="secondary">
               <FormattedMessage id="DASHBOARD.PAIR_REQUEST_NOTIFICATION.TITLE" />
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
            <Stack
               direction={{ xs: "column", md: "row" }}
               alignItems="center"
               justifyContent="space-between"
               spacing={2}
            >
               <Typography>
                  <FormattedMessage id="DASHBOARD.PAIR_REQUEST_NOTIFICATION.DETAILS" values={{ inviter }} />
               </Typography>
               <Stack direction="row" spacing={2}>
                  <Button
                     loading={isPending}
                     color="secondary"
                     startIcon={<FavoriteIcon />}
                     onClick={() =>
                        respondToPairRequest({
                           requestId: invId,
                           accept: true,
                           personOne: inviter,
                           personTwo: user.displayName ?? "Cuttie pie~",
                        })
                     }
                  >
                     <FormattedMessage id="DASHBOARD.PAIR_REQUEST_NOTIFICATION.PRIMARY_BUTTON" />
                  </Button>
                  <Button
                     loading={isPending}
                     startIcon={<HeartBrokenIcon />}
                     color="secondary"
                     variant="text"
                     onClick={() => respondToPairRequest({ requestId: invId, accept: false })}
                  >
                     <FormattedMessage id="DASHBOARD.PAIR_REQUEST_NOTIFICATION.SECONDARY_BUTTON" />
                  </Button>
               </Stack>
            </Stack>
         </AccordionDetails>
      </Accordion>
   );
};

export default PairRequestNotification;
