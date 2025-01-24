import { Box, Card, Stack, Typography } from "@mui/material";
import CustomIconButton from "../General/CustomIconButton";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

type MovieCard = {
   title: string;
   cover: string;
};

const MovieCard = ({ title, cover }: MovieCard) => {
   return (
      <Card
         sx={{
            padding: 2,
            width: 350,
            height: 500,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 3,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1)), url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
      >
         <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
            <Stack spacing={1}>
               <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                  {title}
               </Typography>
               <Box sx={{ width: "fit-content", alignSelf: "center" }}>
                  <CustomIconButton
                     handleOnClick={() => console.log("test")}
                     icon={<BookmarkAddedIcon />}
                     text={<Typography>Add to watchlist</Typography>}
                  />
               </Box>
            </Stack>
         </Stack>
      </Card>
   );
};

export default MovieCard;
