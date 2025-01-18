import { Card, Stack } from "@mui/material";
import { WATCHLIST_STATIC_DATA } from "../../assets/WATCHLIST_STATIC_DATA";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";

const WatchlistPage = () => {
   const { control, watch } = useForm();
   return (
      <Stack spacing={4}>
         <PageTitle
            title="Watchlist"
            subtitle="🍿 Your personalized watchlist: everything you want to watch in one place."
         />
         <Filters control={control} watch={watch} />
         {watch("coolMode") ? (
            <WatchlistList data={WATCHLIST_STATIC_DATA} />
         ) : (
            <Card variant="outlined" sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
               <WatchlistTable data={WATCHLIST_STATIC_DATA} />
            </Card>
         )}
      </Stack>
   );
};

export default WatchlistPage;
