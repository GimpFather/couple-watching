import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../General/Button";
import { motion } from "motion/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useRespondToPairRequest } from "../../api/hooks/pairs";

type PairRequestNotificationProps = {
   inviter: string;
   invId: string;
};

const PairRequestNotification = ({ inviter, invId }: PairRequestNotificationProps) => {
   const { mutate: respondToPairRequest, isPending } = useRespondToPairRequest();
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
               💌 A mysterious lover has sent you a pair request!
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
                  H-Hey… It’s {inviter}… I think you’re really cool, and I’d be so happy to start my CUM journey with
                  you! I hope you don’t mind me asking… 👉👈
               </Typography>
               <Stack direction="row" spacing={2}>
                  <Button
                     loading={isPending}
                     color="secondary"
                     startIcon={<FavoriteIcon />}
                     onClick={() => respondToPairRequest({ requestId: invId, accept: true })}
                  >
                     Agree
                  </Button>
                  <Button
                     loading={isPending}
                     startIcon={<HeartBrokenIcon />}
                     color="secondary"
                     variant="text"
                     onClick={() => respondToPairRequest({ requestId: invId, accept: false })}
                  >
                     Nope
                  </Button>
               </Stack>
            </Stack>
         </AccordionDetails>
      </Accordion>
   );
};

export default PairRequestNotification;
