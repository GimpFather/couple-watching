import { Card, Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";
import { WatchlistFiltersInput } from "../../types/Inputs.types";
import { useGetWatchlistMovies } from "../../api/hooks/watchlist";

const WatchlistPage = () => {
   const { control, watch } = useForm<WatchlistFiltersInput>({ defaultValues: { watchlistMode: "cool" } });
   const { watchlistMode, search } = watch();
   const { data } = useGetWatchlistMovies();
   const filteredData = data?.filter((movie) => movie.title.toLowerCase().includes(search?.toLowerCase() || ""));

   return (
      <Stack spacing={4}>
         <PageTitle title="WATCHLIST.HEADER" subtitle="WATCHLIST.SUBTITLE" />
         <Filters control={control} watch={watch} />
         {watchlistMode === "cool" ? (
            <>{filteredData && <WatchlistList data={filteredData} />}</>
         ) : (
            <Card variant="outlined" sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
               {filteredData && <WatchlistTable data={filteredData} />}
            </Card>
         )}
      </Stack>
   );
};

export default WatchlistPage;
