import { FormattedMessage } from "react-intl";
import InfoSection from "../General/InfoSection";
import AnimatedEmoji from "../General/AnimatedEmoji";
import Monocle from "../../assets/lottie/monocle.json";
import Dizzy from "../../assets/lottie/dizzy.json";

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
            <InfoSection
               title={<FormattedMessage id="ADD_MOVIE.ERROR.NOT_FOUND" />}
               subtitle={<FormattedMessage id="ADD_MOVIE.ERROR_SUBTITLE.NOT_FOUND" />}
               emoji={<AnimatedEmoji emoji={Monocle} width={80} height={80} />}
            />
         )}
         {tooManyResults && (
            <InfoSection
               title={<FormattedMessage id="ADD_MOVIE.TOO_MANY_RESULTS" />}
               subtitle={<FormattedMessage id='"ADD_MOVIE.TOO_MANY_RESULTS_SUBTITLE"' />}
               emoji={<AnimatedEmoji emoji={Dizzy} width={80} height={80} />}
            />
         )}
      </>
   );
};

export default SearchErrorSection;
