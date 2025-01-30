/* eslint-disable react-hooks/rules-of-hooks */
import { Stack } from "@mui/material";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import WatchlistList from "./WatchlistList";
import { WatchlistFiltersInput } from "../../types/Inputs.types";
import { useGetWatchlistMovies } from "../../api/hooks/watchlist";
import WatchlistSkeleton from "../../components/Watchlist/WatchlistSkeleton";
import InfoSection from "../../components/General/InfoSection";
import { useNavigate } from "react-router";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useAuthContext } from "../../context/AuthProvider";
import { usePair } from "../../api/hooks/pairs";

const WatchlistPage = () => {
   const { user } = useAuthContext();
   if (!user) return null;
   const { data: pairData } = usePair(user.uid);
   const navigate = useNavigate();
   const { control, watch, setValue } = useForm<WatchlistFiltersInput>({ defaultValues: { watchlistMode: "cool" } });
   const { watchlistMode, search } = watch();
   const { data, isLoading } = useGetWatchlistMovies({ pairId: pairData?.id ?? "" });
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
                     {filteredData && filteredData.length ? (
                        <>
                           {watchlistMode === "cool" ? (
                              <WatchlistList data={filteredData} />
                           ) : (
                              <WatchlistTable data={filteredData} />
                           )}
                        </>
                     ) : (
                        <InfoSection
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
                              action: () => navigate("/add-movie"),
                           }}
                        />
                     )}
                  </>
               ) : (
                  <InfoSection
                     title="WATCHLIST.EMPTY_STATE.TITLE.NO_DATA"
                     subtitle="WATCHLIST.EMPTY_STATE.SUBTITLE.NO_DATA"
                     emoji="🍿"
                     primaryButton={{
                        icon: <LibraryAddIcon />,
                        caption: "WATCHLIST.EMPTY_STATE.BUTTON.PRIMARY.ADD_MOVIE",
                        action: () => navigate("/add-movie"),
                     }}
                  />
               )}
            </>
         )}
      </Stack>
   );
};

export default WatchlistPage;
