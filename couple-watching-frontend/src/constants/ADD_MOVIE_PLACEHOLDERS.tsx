import AnimatedEmoji from "../components/General/AnimatedEmoji";
import ThinkingEmoji from "../assets/lottie/thinking.json";

export const ADD_MOVIE_PLACEHOLDERS = [
   {
      title: "ADD_MOVIE.HEADER.SHY",
      subtitle: "ADD_MOVIE.SUBTITLE.SHY",
      emoji: "👉👈",
   },
   {
      title: "ADD_MOVIE.HEADER.THINKING",
      subtitle: "ADD_MOVIE.SUBTITLE.THINKING",
      emoji: <AnimatedEmoji emoji={ThinkingEmoji} loop width={80} height={80} />,
   },
   {
      title: "ADD_MOVIE.HEADER.LOOKING",
      subtitle: "ADD_MOVIE.SUBTITLE.LOOKING",
      emoji: "👀",
   },
];
