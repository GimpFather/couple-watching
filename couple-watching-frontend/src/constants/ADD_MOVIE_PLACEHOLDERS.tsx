import AnimatedEmoji from "../components/General/AnimatedEmoji";
import ThinkingEmoji from "../assets/lottie/thinking.json";
import { FormattedMessage } from "react-intl";

export const ADD_MOVIE_PLACEHOLDERS = [
   {
      title: <FormattedMessage id="ADD_MOVIE.HEADER.SHY" />,
      subtitle: <FormattedMessage id="ADD_MOVIE.SUBTITLE.SHY" />,
      emoji: "👉👈",
   },
   {
      title: <FormattedMessage id="ADD_MOVIE.HEADER.THINKING" />,
      subtitle: <FormattedMessage id="ADD_MOVIE.SUBTITLE.THINKING" />,
      emoji: <AnimatedEmoji emoji={ThinkingEmoji} loop width={80} height={80} />,
   },
   {
      title: <FormattedMessage id="ADD_MOVIE.HEADER.LOOKING" />,
      subtitle: <FormattedMessage id="ADD_MOVIE.SUBTITLE.LOOKING" />,
      emoji: "👀",
   },
];
