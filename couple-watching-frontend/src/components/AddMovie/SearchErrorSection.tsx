import InfoSection from "../General/InfoSection";

type SearchErrorSectionProps = {
   response: string;
};

const SearchErrorSection = ({ response }: SearchErrorSectionProps) => {
   const movieNotFound =
      response === "Movie not found!" || response === "Incorrect IMDb ID." || response === "Series not found!";
   const tooManyResults = response === "Too many results.";

   return (
      <>
         {movieNotFound && (
            <InfoSection title="ADD_MOVIE.ERROR.NOT_FOUND" subtitle="ADD_MOVIE.ERROR_SUBTITLE.NOT_FOUND" emoji="🤷‍♂️" />
         )}
         {tooManyResults && (
            <InfoSection title="ADD_MOVIE.TOO_MANY_RESULTS" subtitle="ADD_MOVIE.TOO_MANY_RESULTS_SUBTITLE" emoji="🤯" />
         )}
      </>
   );
};

export default SearchErrorSection;
