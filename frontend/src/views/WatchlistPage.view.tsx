import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useGetOMDbSearchForMovies } from "~/api/hooks/omdb";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBCard from "~/components/NeoBrutalism/NBCard";
import NBIconButton from "~/components/NeoBrutalism/NBIconButton";
import NBSearchBox from "~/components/NeoBrutalism/NBSearchBox";

const LibraryPage = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const { data: omdbSearchData } = useGetOMDbSearchForMovies({ title: searchTerm });

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
               <Typography variant="headingExtraLarge">Watchlist</Typography>
               <NBIconButton icon={<PlusCircleIcon />} />
            </Stack>
            <NBSearchBox placeholder="Search in watchlist" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
