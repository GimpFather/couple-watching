import { Card, Stack } from "@mui/material";
import { WATCHLIST_STATIC_DATA } from "../../assets/WATCHLIST_STATIC_DATA";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";

const WatchlistPage = () => {
   const { control, watch } = useForm();
   return (
      <Stack spacing={4}>
         <PageTitle
            title="Watchlist"
            subtitle="This is a watchlist page, that will allow you to see what you wanna watch."
         />
         <Filters control={control} watch={watch} />
         <Card variant="outlined" sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
            <WatchlistTable data={WATCHLIST_STATIC_DATA} />
         </Card>
      </Stack>
   );
};

export default WatchlistPage;
