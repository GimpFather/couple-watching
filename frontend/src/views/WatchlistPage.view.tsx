import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useGetOMDbSearchForMovies } from "~/api/hooks/omdb";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBIconButton from "~/components/NeoBrutalism/NBIconButton";
import NBSearchBox from "~/components/NeoBrutalism/NBSearchBox";
import NBChip from "~/components/NeoBrutalism/NBChip";

const LibraryPage = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const { data: omdbSearchData } = useGetOMDbSearchForMovies({ title: searchTerm });

   const [selectedChip, setSelectedChip] = useState(['All']);

   const handleChipClick = (chip: string) => {
      if (isChipSelected(chip)) {
         setSelectedChip(selectedChip.filter((c) => c !== chip));
      } else {
         setSelectedChip([...selectedChip, chip]);
      }
   };

   const isChipSelected = (chip: string) => {
      return selectedChip.includes(chip);
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
               <Typography variant="headingExtraLarge">Watchlist</Typography>
               <NBIconButton icon={<PlusCircleIcon />} />
            </Stack>
            <NBSearchBox placeholder="Search in watchlist" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Stack direction="row" gap={2} sx={{ overflowX: "auto" }}>
               <NBChip label="All" onClick={() => handleChipClick("All")} active={selectedChip.includes("All")} />
               <NBChip label="Movies" onClick={() => handleChipClick("Movies")} active={selectedChip.includes("Movies")} />
               <NBChip label="Series" onClick={() => handleChipClick("Series")} active={selectedChip.includes("Series")} />
            </Stack>
            <Stack direction="column" gap={2}>
               {omdbSearchData?.map((movie) => (
                  <NBCard key={movie.imdbID}>
                     <Stack direction="column" gap={1} sx={{ padding: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                           <Typography variant="emphasizedBodyLarge">{movie.title}</Typography>
                           <Typography variant="bodySmall">{movie.year}</Typography>
                        </Stack>
                        <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px", marginTop: 4 }} />
                     </Stack>
                  </NBCard>
               ))}
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default LibraryPage;
