import { Card, Stack } from "@mui/material";
import { WATCHLIST_STATIC_DATA } from "../../constants/WATCHLIST_STATIC_DATA";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";
import { WatchlistFiltersInput } from "../../types/Inputs.types";

const WatchlistPage = () => {
   const { control, watch } = useForm<WatchlistFiltersInput>();
   const watchlistData = WATCHLIST_STATIC_DATA.filter((movie) =>
      movie.title.toLowerCase().includes((watch("search") ?? "").toLowerCase())
   );
   return (
      <Stack spacing={4}>
         <PageTitle title="WATCHLIST.HEADER" subtitle="WATCHLIST.SUBTITLE" />
         <Filters control={control} watch={watch} />
         {watch("coolMode") ? (
            <WatchlistList data={watchlistData} />
         ) : (
            <Card variant="outlined" sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
               <WatchlistTable data={watchlistData} />
            </Card>
         )}
      </Stack>
   );
};

export default WatchlistPage;
