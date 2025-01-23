import { Card, Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";
import { WatchlistFiltersInput } from "../../types/Inputs.types";
import { useGetWatchlistMovies } from "../../api/hooks/watchlist";
import WatchlistEmptyState from "../../components/Watchlist/WatchlistEmptyState";
import WatchlistSkeleton from "../../components/Watchlist/WatchlistSkeleton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const WatchlistPage = () => {
   const { control, watch, setValue } = useForm<WatchlistFiltersInput>({ defaultValues: { watchlistMode: "cool" } });
   const { watchlistMode, search } = watch();
   const { data, isLoading } = useGetWatchlistMovies();
   const filteredData = data?.filter((movie) => movie.title.toLowerCase().includes(search?.toLowerCase() || ""));

   return (
      <Stack spacing={4}>
         <PageTitle title="WATCHLIST.HEADER" subtitle="WATCHLIST.SUBTITLE" />
         <Filters control={control} watch={watch} />
         {isLoading ? (
            <WatchlistSkeleton />
         ) : (
            <>
               {data && data.length ? (
                  <>
                     {watchlistMode === "cool" ? (
                        <>
                           {filteredData?.length ? (
                              <WatchlistList data={filteredData} />
                           ) : (
                              <WatchlistEmptyState
                                 title="WATCHLIST.EMPTY_STATE.TITLE.FILTER"
                                 subtitle="WATCHLIST.EMPTY_STATE.SUBTITLE.FILTER"
                                 emoji="😔"
                                 primaryButton={{
                                    icon: <ClearAllIcon />,
                                    caption: "WATCHLIST.EMPTY_STATE.BUTTON.PRIMARY.CLEAR_FILTERS",
                                    action: () => setValue("search", ""),
                                 }}
                                 secondaryButton={{
                                    icon: <LibraryAddIcon />,
                                    caption: "WATCHLIST.EMPTY_STATE.BUTTON.SECONDARY.ADD_MOVIE",
                                    action: () => alert("Add movie to watchlist"),
                                 }}
                              />
                           )}
                        </>
                     ) : (
                        <Card
                           variant="outlined"
                           sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}
                        >
                           {filteredData && <WatchlistTable data={filteredData} />}
                        </Card>
                     )}
                  </>
               ) : (
                  <WatchlistEmptyState
                     title="WATCHLIST.EMPTY_STATE.TITLE.NO_DATA"
                     subtitle="WATCHLIST.EMPTY_STATE.SUBTITLE.NO_DATA"
                     emoji="🍿"
                     primaryButton={{
                        icon: <LibraryAddIcon />,
                        caption: "WATCHLIST.EMPTY_STATE.BUTTON.PRIMARY.ADD_MOVIE",
                        action: () => alert("Add movie to watchlist"),
                     }}
                  />
               )}
            </>
         )}
      </Stack>
   );
};

export default WatchlistPage;
